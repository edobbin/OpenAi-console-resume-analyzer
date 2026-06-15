import "./JobDescription.css";

type jobDescriptionProps = {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void ;
};

function JobDescription({ jobDescription, onJobDescriptionChange }:jobDescriptionProps) {
    const isFilled = jobDescription.trim().length > 0;

  return (
    <div>
    <div className="job-description-header">
        <p className="step-label">2. Upload Job Description</p>
        <p className="helper-text">copy and paste the job description here</p>
      </div>
    <div className="job-description">
      <textarea
        value={jobDescription}
        onChange={(event) => onJobDescriptionChange(event.target.value)}
        placeholder="Paste the job description here..."
      />
      <p className="word-count">{jobDescription.length} characters</p>
      {isFilled && <p className="filled-indicator">Job description is filled</p>}
    </div>
    </div>
  );
}

export default JobDescription;
