import React from 'react'
import styles from './NebulaGlow.module.css'

export default function NebulaGlow() {
  return (
    <div aria-hidden="true">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  )
}
