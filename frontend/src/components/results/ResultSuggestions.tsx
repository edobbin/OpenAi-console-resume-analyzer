import "./ResultSuggestions.css";

interface ResultSuggestionsProps {
  suggestions: string[];
}

function ResultSuggestions({ suggestions }: ResultSuggestionsProps) {
  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <p className="suggestions-eyebrow">Resume Feedback</p>
        <h2>Improvement Suggestions</h2>
        <p>Changes that could improve your resume's alignment with this role.</p>
      </div>

      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li className="suggestion-item" key={index}>
            <span className="suggestion-number">{String(index + 1).padStart(2, "0")}</span>

            <p>{suggestion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSuggestions;
