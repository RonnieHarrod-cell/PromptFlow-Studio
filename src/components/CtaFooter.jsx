import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CtaFooter.module.css'

export default function CtaFooter() {
  const navigate = useNavigate()
  return (
    <section className={styles.section}>
      <div className={styles.innerGlow} aria-hidden="true" />

      <h2 className={styles.headline}>
        Begin your mission.<br />
        <span className={styles.gradient}>The cosmos awaits.</span>
      </h2>

      <p className={styles.sub}>
        No credit card. No gravity. Just pure, unobstructed flow.
      </p>

      <button className={styles.btn} onClick={() => navigate('/download')}>
        <span>Initialize Download</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </button>

      <footer className={styles.footer}>
        PromptFlow Studio &nbsp;·&nbsp; Deep space, zero latency &nbsp;·&nbsp;
        For those who build the future
      </footer>
    </section>
  )
}
