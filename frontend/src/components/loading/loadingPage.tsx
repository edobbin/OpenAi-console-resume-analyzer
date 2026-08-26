import "./loadingPage.css";

function LoadingPage() {
  return (
    <section className="loading-page">
      <div className="loading-card">
        <div className="loading-spinner" />

        <h1>Analyzing your resume</h1>

        <p className="loading-description">Comparing your resume against the job description.</p>

        <div className="loading-steps">
          <p>Resume processed</p>
          <p>Comparing skills and keywords</p>
          <p>Generating recommendations</p>
        </div>
      </div>
    </section>
  );
}

export default LoadingPage;
