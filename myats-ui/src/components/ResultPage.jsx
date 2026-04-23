import ScoreRing from './ScoreRing'
import styles from './ResultPage.module.css'

/**
 * Props shape — backend fills all of these:
 * {
 *   company:             string
 *   job_title:           string
 *   location:            string | null
 *   salary:              string | null
 *   score:               number  (1-10)
 *   should_apply:        boolean
 *   apply_reason:        string
 *   areas_of_improvement: string[]
 * }
 */
export default function ResultPage({ result, onBack }) {
  const {
    company,
    job_title,
    location,
    salary,
    score,
    should_apply,
    apply_reason,
    areas_of_improvement,
  } = result

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoRow}>
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
        </div>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          New Analysis
        </button>
      </header>

      <main className={styles.main}>

        {/* ── Score + Job Info ── */}
        <div className={styles.topRow}>
          <div className={styles.scoreCard}>
            <p className={styles.cardEyebrow}>Match Score</p>
            <ScoreRing score={score} />
          </div>

          <div className={styles.jobCard}>
            <p className={styles.cardEyebrow}>Position</p>
            <h1 className={styles.jobTitle}>{job_title}</h1>
            <p className={styles.company}>{company}</p>

            <div className={styles.metaList}>
              {location && (
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {location}
                </div>
              )}
              {salary && (
                <div className={styles.metaItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  {salary}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Apply Recommendation ── */}
        <div className={`${styles.applyBanner} ${should_apply ? styles.applyYes : styles.applyNo}`}>
          <div className={styles.applyIcon}>
            {should_apply ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            )}
          </div>
          <div className={styles.applyText}>
            <strong>{should_apply ? 'You should apply' : 'Not recommended to apply'}</strong>
            <span>{apply_reason}</span>
          </div>
        </div>

        {/* ── Improvements ── */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            Resume Improvements
          </h2>
          <p className={styles.sectionSub}>
            Address these to increase your match score for this role.
          </p>
          <ol className={styles.improvementList}>
            {areas_of_improvement.map((item, i) => (
              <li key={i} className={styles.improvementItem}>
                <span className={styles.itemNumber}>{i + 1}</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ol>
        </div>

      </main>

      <footer className={styles.footer}>
        Powered by AI · Results are suggestions, not guarantees
      </footer>
    </div>
  )
}
