import { useRef, useState } from "react";
import "./ResumeUpload.css";

type ResumeUploadProps = {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
};

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE_MB = 5;

function ResumeUpload({ selectedFile, onFileSelect }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSetFile = (file: File) => {
    setError("");

    const isAcceptedType = ACCEPTED_FILE_TYPES.includes(file.type);
    const isAcceptedExtension =
      file.name.toLowerCase().endsWith(".pdf") ||
      file.name.toLowerCase().endsWith(".docx");

    if (!isAcceptedType && !isAcceptedExtension) {
      setError("Please upload a PDF or DOCX resume.");
      onFileSelect(null);
      return;
    }

    const fileSizeMb = file.size / (1024 * 1024);

    if (fileSizeMb > MAX_FILE_SIZE_MB) {
      setError(`File must be under ${MAX_FILE_SIZE_MB} MB.`);
      onFileSelect(null);
      return;
    }

    onFileSelect(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    validateAndSetFile(file);
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    validateAndSetFile(file);
  };

  const formattedFileSize = selectedFile
    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
    : "";

  return (
    <section className="resume-upload-card">
      <div className="resume-upload-header">
        <p className="step-label">1. Upload Resume</p>
        <p className="helper-text">PDF or DOCX, up to 5 MB</p>
      </div>

      <div
        className={`resume-dropzone ${isDragging ? "resume-dropzone--active" : ""}`}
        onClick={handleBrowseClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
      >
        <input
          ref={inputRef}
          className="resume-file-input"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />

        {!selectedFile ? (
          <div className="resume-empty-state">
            <div className="resume-file-icon">📄</div>
            <h3>Drag your resume here</h3>
            <p>or click to browse your files</p>
          </div>
        ) : (
          <div className="resume-selected-file">
            <div className="resume-file-icon">✅</div>

            <div>
              <h3>{selectedFile.name}</h3>
              <p>{formattedFileSize}</p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && (
        <button
          className="remove-file-button"
          type="button"
          onClick={handleRemoveFile}
        >
          Remove file
        </button>
      )}

      {error && <p className="resume-upload-error">{error}</p>}
    </section>
  );
}

export default ResumeUpload;