import "./ResultSummary.css";
interface SummaryProp {
  summary: string;
}

function ResultSummary(props: SummaryProp) {
  return (
    <div className="ResultSummary-container">
      <h2>Analysis Summary</h2>
      <p>{props.summary || "No summary available."}</p>
    </div>
  );
}

export default ResultSummary;
