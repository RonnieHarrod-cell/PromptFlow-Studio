import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className={styles.hero}>
      <div className={styles.eyebrow}>
        <span className={styles.ring} aria-hidden="true" />
        Now in Open Mission
      </div>

      <h1 className={styles.headline}>
        Command the<br />
        <span className={styles.gradient}>Language of the Stars.</span>
      </h1>

      <p className={styles.sub}>
        PromptFlow Studio is the ultimate cockpit for AI orchestration.
        Navigate the complexities of LLM logic with a high-fidelity
        workspace—where{' '}
        <em className={styles.em}>human intent meets machine intelligence</em>{' '}
        at the speed of light.
      </p>

      <div className={styles.ctaCluster}>
        <button className={styles.btnPrimary} onClick={() => navigate('/download')}>
          <span>Initialize Download</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
        <p className={styles.platformNote}>
          Available for Windows &amp; Linux
        </p>
      </div>
    </section>
  )
}
