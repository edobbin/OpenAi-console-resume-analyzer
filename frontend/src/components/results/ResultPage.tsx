import React from "react";
import ResultCard from "./ResultCard";
import "./ResultPage.css";
import type { ResultMetricProps } from "./Result_Metric";
const temporaryData: ResultMetricProps = {
  name: "ATS Match",

  percentage: 85,
  rating: "Strong Match",
  color: "metric-strong",
};
function ResultPage() {
  return (
    <div>
      <section className="hero-section">
        <h1>Analysis Report</h1>
        <p className="eyebrow"> Temporary Data</p>
      </section>
      <ul className="result-metrics-list">
        <li>
          <ResultCard {...temporaryData} />
        </li>
        <li>
          <ResultCard {...temporaryData} />
        </li>
        <li>
          <ResultCard {...temporaryData} />
        </li>
        <li>
          <ResultCard {...temporaryData} />
        </li>
      </ul>
    </div>
  );
}

export default ResultPage;
