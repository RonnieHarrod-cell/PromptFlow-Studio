import React from 'react'
import styles from './FeatureGrid.module.css'

const FEATURES = [
  {
    icon: '⚡',
    category: 'The Engine',
    title: 'Hyper-drive Injection',
    desc: 'Inject complex datasets with the velocity of a supernova. Replace static text with fluid, dynamic data streams that reshape at runtime.',
  },
  {
    icon: '◎',
    category: 'The Observatory',
    title: 'Real-time Telemetry',
    desc: 'Watch your outputs materialize across the event horizon in milliseconds. A side-by-side view that streams responses faster than a pulsar.',
  },
  {
    icon: '◈',
    category: 'The Prism',
    title: 'Spectral Divergence',
    desc: 'A/B test Temp & Top-P to explore the full spectrum of possibility. Every parameter shift reveals a new universe of outputs.',
  },
  {
    icon: '⟳',
    category: 'The Archive',
    title: 'Stellar History',
    desc: 'Every iteration preserved in the vacuum of our version control. Seamlessly drift between states of your prompt\'s evolution.',
  },
]

export default function FeatureGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrow}>
        <span className={styles.sectionLabel}>The Constellation</span>
        <h2 className={styles.sectionTitle}>
          Features from the <span className={styles.gradient}>Deep Field</span>
        </h2>
      </div>
      <div className={styles.grid}>
        {FEATURES.map((f) => (
          <div key={f.category} className={styles.card}>
            <div className={styles.topLine} aria-hidden="true" />
            <div className={styles.iconWrap} aria-hidden="true">{f.icon}</div>
            <div className={styles.category}>{f.category}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
