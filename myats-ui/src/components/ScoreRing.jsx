import { useEffect, useState } from 'react'
import styles from './ScoreRing.module.css'

function scoreColor(score) {
  if (score >= 8) return '#10B981'
  if (score >= 5) return '#F59E0B'
  return '#EF4444'
}

function scoreLabel(score) {
  if (score >= 8) return 'Strong Match'
  if (score >= 5) return 'Partial Match'
  return 'Low Match'
}

export default function ScoreRing({ score }) {
  const [animated, setAnimated] = useState(0)
  const radius = 72
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const color = scoreColor(score)
  const progress = (animated / 10) * circumference
  const offset = circumference - progress

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 80)
    return () => clearTimeout(timer)
  }, [score])

  return (
    <div className={styles.wrapper}>
      <svg height={radius * 2} width={radius * 2} className={styles.svg}>
        <circle
          className={styles.track}
          stroke="#E2E8F0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={styles.progress}
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.score} style={{ color }}>{score}</span>
        <span className={styles.outOf}>/10</span>
      </div>
      <p className={styles.label} style={{ color }}>{scoreLabel(score)}</p>
    </div>
  )
}
