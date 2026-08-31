import "./ResultStrength.css";

interface ResultStrengthsProps {
  strengths: string[];
}

function ResultStrengths({ strengths }: ResultStrengthsProps) {
  return (
    <div className="strengths-container">
      <div className="strengths-header">
        <p className="strengths-eyebrow">Your Advantages</p>
        <h2>Resume Strengths</h2>
        <p>Qualifications and experience that align well with this role.</p>
      </div>

      <ul className="strengths-list">
        {strengths.map((strength, index) => (
          <li className="strength-item" key={index}>
            <span className="strength-icon">✓</span>
            <p>{strength}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultStrengths;
