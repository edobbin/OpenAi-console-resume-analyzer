import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import ResumeUpload from "./components/analyzer/ResumeUpload";
import JobDescription from "./components/analyzer/JobDescription";

function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  return (
    <>
      <Navbar />

      <main className="page-container">
        <section className="hero-section">
          <p className="eyebrow">AI Resume Analyzer</p>
          <h1>Optimize your resume before you apply.</h1>
          <p>
            Upload your resume, paste a job description, and get an AI-powered
            ATS report with scores, skill gaps, keywords, and resume suggestions.
          </p>
        </section>

        <section id="analyzer" className="analyzer-grid">
          <ResumeUpload
            selectedFile={resumeFile}
            onFileSelect={setResumeFile}
          />

          <section id="analyzer" className="analyzer-grid">
            <JobDescription
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default App;