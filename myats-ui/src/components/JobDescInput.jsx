import { useState } from 'react'
import styles from './JobDescInput.module.css'

export default function JobDescInput({ mode, setMode, text, setText, url, setUrl }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          aria-selected={mode === 'paste'}
          className={`${styles.tab} ${mode === 'paste' ? styles.active : ''}`}
          onClick={() => setMode('paste')}
        >
          Paste Text
        </button>
        <button
          role="tab"
          aria-selected={mode === 'url'}
          className={`${styles.tab} ${mode === 'url' ? styles.active : ''}`}
          onClick={() => setMode('url')}
        >
          Job URL
        </button>
      </div>

      <div className={styles.panel}>
        {mode === 'paste' ? (
          <textarea
            className={styles.textarea}
            placeholder="Paste the full job description here…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            aria-label="Job description text"
          />
        ) : (
          <div className={styles.urlRow}>
            <span className={styles.urlIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </span>
            <input
              className={styles.urlInput}
              type="url"
              placeholder="https://jobs.company.com/listing/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Job posting URL"
            />
          </div>
        )}
      </div>
    </div>
  )
}
