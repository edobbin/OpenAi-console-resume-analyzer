import ResultCard from "./ResultCard";
import "./ResultPage.css";
import { getMetricRating } from "./Result_Metric";
import ResultSummary from "./ResultSummary";
import ResultStrengths from "./ResultStrength.tsx";
import ResultSkillGaps from "./ResultSkillGaps.tsx";
import ResultSuggestions from "./ResultSuggestions.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import type { AnalysisResult } from "../../types/Interfaces";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as AnalysisResult | undefined;
  if (!analysis) {
    return (
      <div>
        <p>No analysis result found.</p>
        <button onClick={() => navigate("/")}>Analyze a Resume</button>
      </div>
    );
  }
  return (
    <div>
      <section className="hero-section">
        <h1>Analysis Report</h1>
        <p className="eyebrow">{analysis.job_title} </p>
      </section>
      <section>
        <ul className="result-metrics-list">
          {analysis.metrics.map((metric) => {
            const ratingInfo = getMetricRating(metric.percentage);

            return (
              <li key={metric.name}>
                <ResultCard
                  name={metric.name}
                  percentage={metric.percentage}
                  rating={metric.rating}
                  color={ratingInfo.className}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="result-summary">
        <ResultSummary summary={analysis.summary} />
      </section>
      <section>
        <ResultSuggestions suggestions={analysis.improvement_suggestions} />
      </section>

      <section className="sections">
        <ResultStrengths strengths={analysis.strengths} />
        <ResultSkillGaps skillGaps={analysis.skill_gaps} />
      </section>
      <section>
        <button onClick={() => navigate("/")}>Analyze a Resume</button>
      </section>
    </div>
  );
}

export default ResultPage;
