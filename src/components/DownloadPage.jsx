import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DownloadPage.module.css'

const VERSION = '2.4.1'
const BUILD   = '20250412'

const RELEASES = [
  {
    os: 'macOS',
    icon: '',
    color: '#a78bfa',
    variants: [
      { label: 'Apple Silicon',  arch: 'arm64',  ext: 'dmg',    size: '84 MB', chip: 'M1 · M2 · M3 · M4', recommended: true  },
      { label: 'Intel x86-64',   arch: 'x64',    ext: 'dmg',    size: '91 MB', chip: 'Intel Core i5–i9'                       },
    ],
  },
  {
    os: 'Windows',
    icon: '⊞',
    color: '#60a5fa',
    variants: [
      { label: 'x86-64 (64-bit)', arch: 'x64',   ext: 'exe',    size: '78 MB', chip: 'Most modern PCs',    recommended: true  },
      { label: 'ARM64',           arch: 'arm64',  ext: 'exe',    size: '75 MB', chip: 'Surface Pro X · Snapdragon'             },
      { label: 'x86 (32-bit)',    arch: 'ia32',   ext: 'exe',    size: '74 MB', chip: 'Legacy systems'                         },
    ],
  },
  {
    os: 'Linux',
    icon: '🐧',
    color: '#34d399',
    variants: [
      { label: 'x86-64 AppImage', arch: 'x64',   ext: 'AppImage', size: '96 MB', chip: 'Universal · No install', recommended: true },
      { label: 'x86-64 .deb',    arch: 'x64',    ext: 'deb',    size: '88 MB', chip: 'Debian · Ubuntu · Mint'                 },
      { label: 'x86-64 .rpm',    arch: 'x64',    ext: 'rpm',    size: '89 MB', chip: 'Fedora · RHEL · openSUSE'               },
      { label: 'ARM64 AppImage', arch: 'arm64',   ext: 'AppImage', size: '93 MB', chip: 'Raspberry Pi 4/5 · Ampere'            },
      { label: 'ARM64 .deb',     arch: 'arm64',   ext: 'deb',    size: '85 MB', chip: 'Raspberry Pi OS · Ubuntu ARM'          },
    ],
  },
]

const CHECKSUMS = [
  { file: `PromptFlow-${VERSION}-mac-arm64.dmg`,      sha: 'a3f7c2d91e8b4056' },
  { file: `PromptFlow-${VERSION}-mac-x64.dmg`,        sha: 'b8e1a045f3c72d98' },
  { file: `PromptFlow-${VERSION}-win-x64.exe`,        sha: 'c2d4f8a176e30b59' },
  { file: `PromptFlow-${VERSION}-win-arm64.exe`,      sha: 'd5b9e3c027f41a86' },
  { file: `PromptFlow-${VERSION}-win-ia32.exe`,       sha: 'e1c6d8b392a50f74' },
  { file: `PromptFlow-${VERSION}-linux-x64.AppImage`, sha: 'f4a2e7c081b93d65' },
  { file: `PromptFlow-${VERSION}-linux-x64.deb`,      sha: 'a7f3b1d592c04e28' },
  { file: `PromptFlow-${VERSION}-linux-x64.rpm`,      sha: 'b0e8c4a613d75f91' },
  { file: `PromptFlow-${VERSION}-linux-arm64.AppImage`,sha:'c3d9f2b047e81a54'},
  { file: `PromptFlow-${VERSION}-linux-arm64.deb`,    sha: 'd6a0e5c128f94b37' },
]

function DownloadCard({ variant, os, onDownload }) {
  const [state, setState] = useState('idle') // idle | downloading | done

  const handleClick = () => {
    setState('downloading')
    setTimeout(() => setState('done'), 1800)
    onDownload?.()
  }

  const filename = `PromptFlow-${VERSION}-${os.toLowerCase()}-${variant.arch}.${variant.ext}`

  return (
    <div className={`${styles.card} ${variant.recommended ? styles.recommended : ''}`}>
      {variant.recommended && (
        <span className={styles.badge}>Recommended</span>
      )}
      <div className={styles.cardTop}>
        <div>
          <div className={styles.cardLabel}>{variant.label}</div>
          <div className={styles.cardChip}>{variant.chip}</div>
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.ext}>.{variant.ext}</span>
          <span className={styles.size}>{variant.size}</span>
        </div>
      </div>

      <div className={styles.cardFilename}>{filename}</div>

      <button
        className={`${styles.dlBtn} ${state === 'downloading' ? styles.dlBtnLoading : ''} ${state === 'done' ? styles.dlBtnDone : ''}`}
        onClick={handleClick}
        disabled={state === 'downloading'}
        aria-label={`Download ${filename}`}
      >
        {state === 'idle'        && <><DownloadIcon /> Download</>}
        {state === 'downloading' && <><SpinnerIcon /> Preparing…</>}
        {state === 'done'        && <><CheckIcon /> Launched</>}
      </button>
    </div>
  )
}

export default function DownloadPage() {
  const navigate = useNavigate()
  const [showChecksums, setShowChecksums] = useState(false)

  return (
    <div className={styles.page}>
      {/* Back */}
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Return to Mission Briefing
      </button>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.ring} aria-hidden="true" />
          v{VERSION} · Build {BUILD}
        </div>
        <h1 className={styles.headline}>
          Select Your <span className={styles.gradient}>Launch Vector</span>
        </h1>
        <p className={styles.sub}>
          Choose the build optimised for your architecture. All packages are
          signed, notarised, and verified against the checksums below.
        </p>
      </div>

      {/* OS Sections */}
      {RELEASES.map(rel => (
        <section key={rel.os} className={styles.osSection}>
          <div className={styles.osHeader}>
            <span className={styles.osIcon} style={{ '--c': rel.color }} aria-hidden="true">
              {rel.icon}
            </span>
            <div>
              <h2 className={styles.osName} style={{ '--c': rel.color }}>{rel.os}</h2>
              <span className={styles.osCount}>{rel.variants.length} build{rel.variants.length > 1 ? 's' : ''} available</span>
            </div>
          </div>
          <div className={styles.cardGrid}>
            {rel.variants.map(v => (
              <DownloadCard key={v.arch + v.ext} variant={v} os={rel.os} />
            ))}
          </div>
        </section>
      ))}

      {/* Checksums */}
      <section className={styles.checksumSection}>
        <button
          className={styles.checksumToggle}
          onClick={() => setShowChecksums(s => !s)}
          aria-expanded={showChecksums}
        >
          <span className={styles.checksumIcon} aria-hidden="true">🔐</span>
          SHA-256 Checksums
          <span className={styles.chevron} style={{ transform: showChecksums ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▾
          </span>
        </button>

        {showChecksums && (
          <div className={styles.checksumTable}>
            <div className={styles.checksumHeader}>
              <span>File</span>
              <span>SHA-256 (truncated)</span>
            </div>
            {CHECKSUMS.map(c => (
              <div key={c.file} className={styles.checksumRow}>
                <span className={styles.checksumFile}>{c.file}</span>
                <code className={styles.checksumHash}>{c.sha}…</code>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer note */}
      <p className={styles.footerNote}>
        PromptFlow Studio is free forever for solo pilots.&nbsp;
        <span className={styles.footerAccent}>Enterprise fleet licenses</span> available for teams navigating at scale.
      </p>
    </div>
  )
}

/* ── Icon helpers ── */
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className={styles.spinSvg}>
      <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
