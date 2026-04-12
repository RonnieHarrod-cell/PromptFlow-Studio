import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <span className={styles.dot} aria-hidden="true" />
        PromptFlow Studio
      </div>
      <span className={styles.trust}>
        Trusted by the architects of the digital cosmos
      </span>
      <button className={styles.navCta} onClick={() => navigate('/download')}>Initialize</button>
    </nav>
  )
}
