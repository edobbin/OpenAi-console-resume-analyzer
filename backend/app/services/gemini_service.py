from http.client import HTTPException
import os
from google import genai
from google.genai import errors
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
- When refering to myself use neutral non direct nouns and pronouns like you, yourself but not limited to those.
"""

return_instructions = """
Return ONLY valid JSON.

Use exactly this schema:

{
  "job_title": "string",
  "overall_rating": "string",
  "metrics": [
    {
      "name": "ATS Match Score",
      "percentage": 0,
      "rating": "string"
    },
    {
      "name": "Keyword Match",
      "percentage": 0,
      "rating": "string"
    },
    {
      "name": "Skill Match",
      "percentage": 0,
      "rating": "string"
    },
    {
      "name": "Experience Fit",
      "percentage": 0,
      "rating": "string"
    }
  ],
  "summary": "string",
  "strengths": ["string"],
  "skill_gaps": [
    {
      "skill": "string",
      "severity": "High | Medium | Low",
      "evidence": "string"
    }
  ],
  "recommended_keywords": ["string"],
  "improvement_suggestions": ["string"],
  "suggested_resume_bullet": "string"
}

Requirements:
- Return exactly four metric objects in the listed order.
- Each percentage must be an integer from 0 to 100.
- job_title should be extracted from the job description. If unclear, use
  "Target Role".
- overall_rating should correspond to the ATS Match Score.
- summary should be two or three concise sentences.
- strengths should contain 3 to 6 items.
- skill_gaps should contain only genuine gaps supported by the job description.
- recommended_keywords should contain 5 to 12 relevant terms.
- improvement_suggestions should contain 3 to 6 concrete edits.
- Return an empty array when no valid items exist.
- Return JSON only.
- Do not include markdown, code fences, or commentary.
"""

def analyze_resume_with_gemini(
    resume_text: str,
    jd_text: str,
) -> dict:

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.1-flash-lite",
                contents=(
                    prompt_template
                    + "\n\n"
                    + return_instructions
                    + "\n\nResume:\n"
                    + resume_text
                    + "\n\nJob Description:\n"
                    + jd_text
                ),
            )

            response_text = (
                response.text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

            analysis = json.loads(response_text)

            return {
                "success": True,
                "analysis": analysis,
            }

        except errors.ClientError as e:
            print(f"Gemini client error: {e}")

            # Quota / rate limit
            if e.code == 429:
                return {
                    "success": False,
                    "status_code": 429,
                    "error": "Gemini quota or rate limit exceeded.",
                }

            return {
                "success": False,
                "status_code": e.code,
                "error": "Gemini request failed.",
            }

        except errors.ServerError as e:
            print(f"Gemini server error: {e}")

            # Retry temporary Gemini outages
            if attempt < 2:
                time.sleep(2 ** attempt)
                continue

            return {
                "success": False,
                "status_code": 503,
                "error": "Gemini is temporarily unavailable.",
            }

        except json.JSONDecodeError:
            return {
                "success": False,
                "status_code": 502,
                "error": "Gemini returned invalid JSON.",
            }

        except Exception as e:
            print(f"Unexpected Gemini error: {e}")

            return {
                "success": False,
                "status_code": 500,
                "error": "Unexpected AI service error.",
            }