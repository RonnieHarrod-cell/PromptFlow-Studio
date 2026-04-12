import React, { useMemo } from 'react'
import styles from './StarField.module.css'

export default function StarField({ count = 140 }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.1,
      duration: (Math.random() * 4 + 2).toFixed(1),
      delay: (Math.random() * 6).toFixed(1),
    }))
  }, [count])

  return (
    <div className={styles.field} aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className={styles.star}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--base-opacity': s.opacity,
            '--dur': `${s.duration}s`,
            '--del': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
