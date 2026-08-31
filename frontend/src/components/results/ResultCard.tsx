import "./ResultCard.css";
import { type ResultMetricProps } from "./Result_Metric.ts";
//{ name, percentage, rating, color }
function ResultCard(prop: ResultMetricProps) {
  return (
    <section className="ResultCard-container">
      <h3>{prop.name}</h3>
      <div className="Result-Mertic">
        <h1 className={`${prop.color}`}>{prop.percentage}%</h1>
        <p className={`${prop.color}`}>{prop.rating}</p>
      </div>
    </section>
  );
}

export default ResultCard;
