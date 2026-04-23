import { useState } from 'react'
import ResumeDropzone from './ResumeDropzone'
import JobDescInput from './JobDescInput'
import styles from './UploadPage.module.css'

export default function UploadPage({ onResult }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jdMode, setJdMode] = useState('paste')
  const [jdText, setJdText] = useState('')
  const [jdUrl, setJdUrl] = useState('')
  const [extraPrompt, setExtraPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const jobDescFilled = jdMode === 'paste' ? jdText.trim().length > 0 : jdUrl.trim().length > 0
  const canSubmit = resumeFile && jobDescFilled && !loading

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError(null)
    try {
      // API integration point — replace with real fetch to your backend
      // const formData = new FormData()
      // formData.append('resume', resumeFile)
      // formData.append('job_description', jdText)
      // formData.append('job_url', jdUrl)
      // formData.append('extra', extraPrompt)
      // const res = await fetch('/api/analyze', { method: 'POST', body: formData })
      // const result = await res.json()
      // onResult(result)
      await new Promise((r) => setTimeout(r, 1500))
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoMark}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <span className={styles.logoText}>My<strong>ATS</strong></span>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.headline}>Tailor your resume to any job</h1>
          <p className={styles.sub}>
            Upload your resume and paste a job description — MyATS scores your
            match and shows you exactly what to improve.
          </p>
        </div>

        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <section className={styles.section}>
            <label className={styles.sectionLabel}>
              <span className={styles.stepBadge}>1</span>
              Your Resume
            </label>
            <ResumeDropzone file={resumeFile} onChange={setResumeFile} />
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <label className={styles.sectionLabel}>
              <span className={styles.stepBadge}>2</span>
              Job Description
            </label>
            <JobDescInput
              mode={jdMode}
              setMode={setJdMode}
              text={jdText}
              setText={setJdText}
              url={jdUrl}
              setUrl={setJdUrl}
            />
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <label className={styles.sectionLabel} htmlFor="extra">
              <span className={styles.stepBadgeOptional}>+</span>
              Extra Instructions
              <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="extra"
              className={styles.extraInput}
              type="text"
              placeholder="e.g. Focus on leadership skills, highlight remote work experience…"
              value={extraPrompt}
              onChange={(e) => setExtraPrompt(e.target.value)}
            />
          </section>

          <button
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
            disabled={!canSubmit}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Analyze My Resume
              </>
            )}
          </button>

          {error && <p className={styles.submitError}>{error}</p>}

          {!resumeFile && !jobDescFilled && (
            <p className={styles.formHint}>Upload your resume and add a job description to get started.</p>
          )}
        </form>
      </main>

      <footer className={styles.footer}>
        Powered by AI · Your files are never stored
      </footer>
    </div>
  )
}
