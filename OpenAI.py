from flask import Flask, request, render_template, url_for
import os

app = Flask(__name__)

@app.route('/', methods = ["GET","POST"])

def test():
    print("Route accessed!")
    if request.method =="POST":
        jdesc = request.form.get("jdesc")

        print("Job Description:", jdesc)
        return jdesc
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)