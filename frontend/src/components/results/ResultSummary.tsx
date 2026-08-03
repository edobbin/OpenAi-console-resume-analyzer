import React from "react";
import "./ResultSummary.css";

function ResultSummary(props) {
  return (
    <div className="ResultSummary-container">
      <h2>Analysis Summary</h2>
      <p>{props.summary || "No summary available."}</p>
    </div>
  );
}

export default ResultSummary;
