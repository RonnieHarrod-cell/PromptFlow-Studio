import React, { useEffect, useState } from 'react'
import styles from './ProductMockup.module.css'

const STREAM_TEXT = [
  { delay: 400,  text: 'Based on the ' },
  { delay: 900,  text: '{{domain}}' , highlight: true },
  { delay: 1300, text: ' parameters,\nthe dataset reveals three primary\nsignal clusters across the\n' },
  { delay: 2000, text: 'observed spectrum', highlight: true },
  { delay: 2400, text: '...\n\n' },
  { delay: 3000, text: '▍ Materializing across the event horizon', dim: true },
]

export default function ProductMockup() {
  const [streamIndex, setStreamIndex] = useState(0)

  useEffect(() => {
    const timers = STREAM_TEXT.map((item, i) =>
      setTimeout(() => setStreamIndex(i + 1), item.delay)
    )
    const loop = setInterval(() => {
      setStreamIndex(0)
      STREAM_TEXT.forEach((item, i) => {
        setTimeout(() => setStreamIndex(i + 1), item.delay)
      })
    }, 6000)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(loop)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.outerGlow} aria-hidden="true" />
      <div className={styles.frame}>
        {/* Title bar */}
        <div className={styles.bar}>
          <span className={styles.dotRed}   aria-hidden="true" />
          <span className={styles.dotYellow} aria-hidden="true" />
          <span className={styles.dotGreen}  aria-hidden="true" />
          <span className={styles.frameTitle}>PromptFlow Studio — Mission Alpha</span>
        </div>

        {/* Panels */}
        <div className={styles.body}>
          {/* Editor */}
          <div className={styles.editor}>
            <div className={styles.panelLabel}>Prompt Cockpit</div>
            <div className={styles.code}>
              <Line><Kw>system</Kw> <Op>→</Op> <Str>"You are an expert in <Var>{'{{domain}}'}</Var>"</Str></Line>
              <Line>&nbsp;</Line>
              <Line><Kw>user</Kw> <Op>→</Op> <Str>"Analyze the following data:"</Str></Line>
              <Line>&nbsp;&nbsp;<Var>{'{{dataset}}'}</Var></Line>
              <Line>&nbsp;</Line>
              <Line><Kw>temp</Kw>  <Op>:</Op> 0.72 &nbsp;&nbsp; <Kw>top_p</Kw> <Op>:</Op> 0.94</Line>
              <Line><Kw>model</Kw> <Op>:</Op> gpt-4o &nbsp; <Kw>tokens</Kw> <Op>:</Op> 4096</Line>
              <Line>&nbsp;</Line>
              <Line><Kw>run</Kw> <Var>version_7</Var><span className={styles.cursor} aria-hidden="true" /></Line>
            </div>
          </div>

          {/* Preview */}
          <div className={styles.preview}>
            <div className={styles.panelLabel}>Real-time Telemetry</div>
            <div className={styles.streamStatus}>
              <span className={styles.streamDot} aria-hidden="true" />
              <span className={styles.streamHi}>Stream active</span>
              {' — 47ms latency'}
            </div>
            <div className={styles.streamText} aria-live="polite">
              {STREAM_TEXT.slice(0, streamIndex).map((item, i) => (
                <span
                  key={i}
                  className={
                    item.highlight ? styles.streamHi :
                    item.dim       ? styles.streamDim : ''
                  }
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── tiny inline helpers ── */
const Line = ({ children }) => <div className={styles.line}>{children}</div>
const Kw   = ({ children }) => <span className={styles.kw}>{children}</span>
const Op   = ({ children }) => <span className={styles.op}>{children}</span>
const Str  = ({ children }) => <span className={styles.str}>{children}</span>
const Var  = ({ children }) => <span className={styles.var}>{children}</span>
