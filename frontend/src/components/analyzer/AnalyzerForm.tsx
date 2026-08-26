import { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";
import "./AnalyzerForm.css";

function AnalyzerForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resumeFile) {
      console.error("No resume selected");
      return;
    }
    // if (jobDescription.trim().length < 100) {
    //   console.error("Job description is too short");
    //   return;
    // }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    // Example API call (replace with your actual endpoint)
    // const response = await fetch("/api/analyze", {

    try {
      const response = await fetch(`${API_URL}/analysis/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
        return;
      }
      console.log("Resume analysis successful:", data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    }
  }

  return (
    <div className="analyzer-form">
      <section className="hero-section">
        <p className="eyebrow">AI Resume Analyzer</p>
        <h1>Optimize your resume before you apply.</h1>
        <p>
          Upload your resume, paste a job description, and get an AI-powered ATS report with scores,
          skill gaps, keywords, and resume suggestions.
        </p>
      </section>
      <form onSubmit={handleSubmit}>
        <ResumeUpload selectedFile={resumeFile} onFileSelect={setResumeFile} />
        <JobDescription
          jobDescription={jobDescription}
          onJobDescriptionChange={setJobDescription}
        />
        <button type="submit" className="{}">
          Analyze Resume
        </button>
      </form>
    </div>
  );
}

export default AnalyzerForm;
