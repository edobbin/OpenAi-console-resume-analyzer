import os
from google import genai
from dotenv import load_dotenv
import json
import time

# Load variables from the .env file if you chose Method B
load_dotenv()

# Initialize the client. 
# It automatically reads the GEMINI_API_KEY environment variable.
client = genai.Client()

prompt_template = """
You are an AI resume and job application evaluator.

Compare the provided resume against the provided job description.

Your goals:
1. Rate how well the resume matches the job description.
2. Identify strengths that are clearly supported by the resume.
3. Identify missing or weak skills compared to the job description.
4. Recommend whether the user should apply.
5. Suggest improvements to the resume.

Important rules:
- Do not invent projects, skills, certifications, degrees, employers, or experience that are not present in the resume.
- If something is not clearly shown in the resume, treat it as missing or uncertain.
- Base your evaluation only on the provided resume and job description.
- Be honest but constructive.
"""

return_instructions = """
Return ONLY valid JSON.

Use exactly this schema:

{
  "match_score": integer,
  "application_recommendation": string,
  "summary": string,
  "strengths": [string],
  "missing_skills": [string],
  "resume_improvement_suggestions": [string],
  "job_fit_concerns": [string]
}

Rules:
- match_score must be an integer from 1 to 10.
- application_recommendation must be one of:
  "Strong Apply",
  "Apply",
  "Apply With Improvements",
  "Not Recommended".
- strengths must only include things supported by the resume.
- missing_skills must be based on the job description.
- resume_improvement_suggestions must not invent experience.
- Return JSON only. Do not include markdown, commentary, or code fences.
"""

def analyze_resume_with_gemini(resume_text: str, jd_text: str) -> dict:

    for i in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt_template + "\n\n" + return_instructions + "\n\nResume:\n" + resume_text + "\n\nJob Description:\n" + jd_text
            )
            response_text = response.text.strip()

            # Remove markdown code fences if Gemini adds them
            response_text = response_text.replace("```json", "").replace("```", "").strip()

            return json.loads(response_text)
        except Exception as e:
            print(f"Attempt {i+1} failed: {e}")
            if i < 2:
                time.sleep(2 * (i + 1))


    return {
        "success": False,
        "error": "Gemini service unavailable after multiple attempts."
    }