import React from 'react'
import styles from './SocialProof.module.css'

const QUOTES = [
  {
    quote: 'This isn\'t a prompt editor. It\'s a command deck. The moment I loaded my first variable chain, I understood what flow state actually means for AI work.',
    highlight: 'command deck',
    name: 'Lead AI Engineer',
    org: 'Interstellar Systems',
  },
  {
    quote: 'Every prompt iteration preserved in perfect fidelity. The stellar history feature alone saved our team weeks of lost experimentation.',
    highlight: 'perfect fidelity',
    name: 'Principal Architect',
    org: 'Void Technologies',
  },
  {
    quote: 'Real-time telemetry changed how I think about prompting. Watching outputs materialize at pulsar speed is genuinely intoxicating.',
    highlight: 'pulsar speed',
    name: 'ML Systems Lead',
    org: 'Nova Research',
  },
]

export default function SocialProof() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % QUOTES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const q = QUOTES[active]

  const parts = q.quote.split(q.highlight)

  return (
    <section className={styles.section}>
      <div className={styles.quoteWrap}>
        <span className={styles.quoteGlyph} aria-hidden="true">"</span>
        <p className={styles.quote} key={active}>
          {parts[0]}
          <em className={styles.em}>{q.highlight}</em>
          {parts[1]}
        </p>
      </div>

      <div className={styles.attribution}>
        <span className={styles.name}>{q.name}</span>
        <span className={styles.slash} aria-hidden="true">/</span>
        <span className={styles.org}>{q.org}</span>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Quote navigation">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
