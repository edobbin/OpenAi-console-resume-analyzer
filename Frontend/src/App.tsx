import './App.css'
import Navbar from "./components/layout/Navbar";

function App() {

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

          <div className="hero-actions">
            <a href="#analyzer" className="primary-button">
              Analyze Resume
            </a>

            <a href="#sample-report" className="secondary-button">
              View Sample Report
            </a>
          </div>
        </section>

        <section id="analyzer" className="placeholder-section">
          <h2>Resume Analyzer</h2>
          <p>Analyzer form will go here.</p>
        </section>

        <section id="sample-report" className="placeholder-section">
          <h2>Sample Report</h2>
          <p>Results dashboard will go here.</p>
        </section>
      </main>
    </>
  )
}

export default App
