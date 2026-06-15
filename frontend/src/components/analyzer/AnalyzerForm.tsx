import { useState } from "react";
import ResumeUpload from "./ResumeUpload";
import JobDescription from "./JobDescription";

function AnalyzerForm() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState<string>("");

      async function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!resumeFile) return;
        if (jobDescription.trim().length < 100) return;

        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("jobDescription", jobDescription);

        // Example API call (replace with your actual endpoint)
        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to analyze resume");
        }

      }

  return (
    <div className="analyzer-form">
      <section className="hero-section">
          <p className="eyebrow">AI Resume Analyzer</p>
          <h1>Optimize your resume before you apply.</h1>
          <p>
            Upload your resume, paste a job description, and get an AI-powered
            ATS report with scores, skill gaps, keywords, and resume suggestions.
          </p>
        </section>
        <form onSubmit={handleSubmit}>
      <ResumeUpload
        selectedFile={resumeFile}
        onFileSelect={setResumeFile}
      />
      <JobDescription
        jobDescription={jobDescription}
        onJobDescriptionChange={setJobDescription}
      />
      <button type="submit">Analyze Resume</button>
      </form>
    </div>
  );
}

export default AnalyzerForm;