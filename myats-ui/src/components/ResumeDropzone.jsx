import { useRef, useState } from 'react'
import styles from './ResumeDropzone.module.css'

const ACCEPTED = ['.pdf', '.doc', '.docx']
const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function fileIcon(name) {
  if (!name) return null
  const ext = name.split('.').pop().toLowerCase()
  if (ext === 'pdf') return '📄'
  if (ext === 'doc' || ext === 'docx') return '📝'
  return '📎'
}

export default function ResumeDropzone({ file, onChange }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState(null)

  function validate(f) {
    if (!ACCEPTED_MIME.includes(f.type)) {
      setError('Only PDF, DOC, or DOCX files are accepted.')
      return false
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.')
      return false
    }
    setError(null)
    return true
  }

  function handleFiles(files) {
    const f = files[0]
    if (f && validate(f)) onChange(f)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function onDragOver(e) {
    e.preventDefault()
    setDragging(true)
  }

  function onDragLeave() {
    setDragging(false)
  }

  function onInputChange(e) {
    handleFiles(e.target.files)
  }

  function clearFile(e) {
    e.stopPropagation()
    onChange(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.zone} ${dragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && !file && inputRef.current?.click()}
        aria-label="Resume upload area"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          className={styles.hiddenInput}
          onChange={onInputChange}
        />

        {file ? (
          <div className={styles.filePreview}>
            <span className={styles.fileIconLarge}>{fileIcon(file.name)}</span>
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>
                {(file.size / 1024).toFixed(0)} KB
              </span>
            </div>
            <button className={styles.removeBtn} onClick={clearFile} aria-label="Remove file">
              ✕
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.uploadIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className={styles.dropText}>
              <strong>Drop your resume here</strong> or{' '}
              <span className={styles.browseLink}>browse</span>
            </p>
            <p className={styles.hint}>PDF, DOC, DOCX · Max 10 MB</p>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
