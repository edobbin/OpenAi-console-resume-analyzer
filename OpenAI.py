from flask import Flask, request, render_template, url_for
import os, json
from openai import OpenAI
from google import genai
from config import API_KEY, GEMINI_API_KEY
import fitz

LLM_PROMPT = """
Act as if youre the hiring manager, when a job application description is given rate it on a scale of 1-10 compared to the attached resume and give what can be improved upon
Dont makeup any projects or skills I do not have. Return the results a json file like this:
OUTPUT
Return ONLY a single JSON object (no prose, no code fences) with exactly these keys:
{
  "company": string,
  "job_title": string,
  "job_description": string,
  "score": integer,           // 1–10
  "areas_of_improvement": [   // 1–10 concise items, no numbering
    string
  ]
}
    areas of improvement can have multiple entries, up to 10
"""

app = Flask(__name__)

@app.route('/', methods = ['GET','POST'])

def llmCall(extra: str, jDesc: str, resume: str):
    final_prompt = LLM_PROMPT + "\n\n" + extra
    client = genai.Client(api_key=GEMINI_API_KEY)
    resp = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""{LLM_PROMPT}
        JOB DESCRIPTION:
        {jDesc}

        RESUME:
        {resume}
        """
    )
    print(resp.text)
    return json.loads(resp.text)

def test():
    


    print("Route accessed!")
    if request.method =='POST':
        jdesc = request.form.get('jdesc','')
        resume_file = request.files.get('resume')
        extra_prompt = ' '
        extra_prompt += request.form.get("extra")
        if resume_text:
            resume_text= resume_file.read().decode('utf-8')
            print(resume_text)
        
        print("Job Description:", jdesc)
        print("Resume:", resume_file.filename)
        result_file = llmCall(extra_prompt,jdesc,resume_text)
        return result_file
    return render_template("index.html", submitted=False)


if __name__ == "__main__":
    app.run(debug=True)