from flask import Flask, request, render_template, url_for
import os
from openai import OpenAI
from config import API_KEY

#oai = OpenAI(API_KEY)

app = Flask(__name__)

@app.route('/', methods = ["GET","POST"])

def test():
    print("Route accessed!")
    if request.method =="POST":
        jdesc = request.form.get("jdesc")
        resume_file = request.files("resume")
        extra_prompt = request.form.get("extra")
        if resume_text:
            resume_text= resume_file.read().decode('utf-8')
            print(resume_text)
        print("Job Description:", jdesc)
        return jdesc
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)