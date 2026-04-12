import React from 'react'
import styles from './StatsBar.module.css'

const STATS = [
  { num: '12,400+', label: 'Cosmic architects' },
  { num: '3.2M',    label: 'Prompts launched'  },
  { num: '<40ms',   label: 'Stream latency'     },
  { num: '∞',       label: 'Iterations possible'},
]

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      {STATS.map(s => (
        <div key={s.label} className={styles.item}>
          <span className={styles.num}>{s.num}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
