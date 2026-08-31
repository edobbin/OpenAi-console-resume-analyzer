import "./ResultSkillGaps.css";
import type { SkillGap } from "../../types/Interfaces";

interface ResultSkillGapsProps {
  skillGaps: SkillGap[];
}

function ResultSkillGaps({ skillGaps }: ResultSkillGapsProps) {
  return (
    <div className="skill-gaps-container">
      <div className="skill-gaps-header">
        <p className="skill-gaps-eyebrow">Areas to Improve</p>
        <h2>Skill Gaps</h2>
        <p>
          Qualifications from the job description that are missing or underrepresented in your
          resume.
        </p>
      </div>

      <ul className="skill-gaps-list">
        {skillGaps.map((gap) => (
          <li className="skill-gap-item" key={gap.skill}>
            <div className="skill-gap-title">
              <h3>{gap.skill}</h3>

              <span className={`skill-gap-severity severity-${gap.severity.toLowerCase()}`}>
                {gap.severity}
              </span>
            </div>

            <p>{gap.evidence}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSkillGaps;
