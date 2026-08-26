import React from "react";
import ResultCard from "./ResultCard";
import "./ResultPage.css";
import { getMetricRating, type ResultMetricProps } from "./Result_Metric";
import ResultSummary from "./ResultSummary";
import { useLocation, useNavigate } from "react-router-dom";
import type { AnalysisResult } from "../../types/Interfaces";

const temporaryData: ResultMetricProps = {
  name: "ATS Match",

  percentage: 85,
  rating: "Strong Match",
  color: "metric-strong",
};
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
        <p className="eyebrow"> Temporary Data</p>
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
        <ResultSummary />
      </section>
      <section></section>
    </div>
  );
}

export default ResultPage;
