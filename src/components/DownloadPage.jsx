import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DownloadPage.module.css'
import pkg from '../../package.json'

const GITHUB_REPO = 'RonnieHarrod-cell/PromptFlow-Desktop'
const APP_VERSION_FALLBACK = pkg.version
const envVersion  = import.meta.env.VITE_APP_VERSION?.replace(/^v/, '')
const VERSION     = (envVersion && /^\d/.test(envVersion)) ? envVersion : APP_VERSION_FALLBACK
const BUILD_DATE  = '14/04/2026'

function assetUrl(filename) {
  return `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${filename}`
}

const RELEASES = [
  {
    os: 'Windows',
    icon: '⊞',
    color: '#60a5fa',
    variants: [
      {
        label: 'x86-64 (64-bit)',
        arch: 'x64',
        ext: 'exe',
        size: '101 MB',
        chip: 'Most modern PCs',
        recommended: true,
        filename: `PromptFlow-${VERSION}-x64.exe`,
      },
      {
        label: 'ARM64',
        arch: 'arm64',
        ext: 'exe',
        size: '104 MB',
        chip: 'Surface Pro X · Snapdragon',
        filename: `PromptFlow-${VERSION}-arm64.exe`,
      },
      {
        label: 'x86 (32-bit)',
        arch: 'ia32',
        ext: 'exe',
        size: '92.1 MB',
        chip: 'Legacy systems',
        filename: `PromptFlow-${VERSION}-ia32.exe`,
      },
    ],
  },
  {
    os: 'Linux',
    icon: '🐧',
    color: '#34d399',
    variants: [
      {
        label: 'x86-64 AppImage',
        arch: 'x64',
        ext: 'AppImage',
        size: '142 MB',
        chip: 'Universal · No install needed',
        recommended: true,
        filename: `PromptFlow-${VERSION}-x86_64.AppImage`,
      },
      {
        label: 'x86-64 .deb',
        arch: 'x64',
        ext: 'deb',
        size: '102 MB',
        chip: 'Debian · Ubuntu · Mint',
        filename: `PromptFlow-${VERSION}-x86_64.deb`,
      },
      {
        label: 'x86-64 .rpm',
        arch: 'x64',
        ext: 'rpm',
        size: '85.8 MB',
        chip: 'Fedora · RHEL · openSUSE',
        filename: `PromptFlow-${VERSION}-x86_64.rpm`,
      },
      {
        label: 'ARM64 AppImage',
        arch: 'arm64',
        ext: 'AppImage',
        size: '142 MB',
        chip: 'Raspberry Pi 4/5 · Ampere',
        filename: `PromptFlow-${VERSION}-arm64.AppImage`,
      },
      {
        label: 'ARM64 .deb',
        arch: 'arm64',
        ext: 'deb',
        size: '96.8 MB',
        chip: 'Raspberry Pi OS · Ubuntu ARM',
        filename: `PromptFlow-${VERSION}-arm64.deb`,
      },
    ],
  },
]

const CHECKSUMS = [
  { file: `PromptFlow-Setup-${VERSION}-x64.exe`,       sha: 'sha256:d2386595afa306151c96baa45ea035126eeab9bc381e79daf842e386d6b8e1df' },
  { file: `PromptFlow-Setup-${VERSION}-arm64.exe`,     sha: 'sha256:d7e97e1730cdb3bf6f42377b683f30074d86bf6f7779cfcfa05b439c554751d3' },
  { file: `PromptFlow-Setup-${VERSION}-ia32.exe`,      sha: 'sha256:31cbc135fc9da07e76b1bec8f41910638b5d8494c373a9aaa3914a5090b593f4' },
  { file: `PromptFlow-${VERSION}-x86_64.AppImage`,     sha: 'sha256:4e12f67a03f89f02ed15a6cf4704c53e4c0a338b4174d9ab13f180bbf641adda' },
  { file: `PromptFlow-${VERSION}-x86_64.deb`,          sha: 'sha256:3acd312ba18757d342f6f55bdb98dd50ba54faeace497b6470cf5aa62c08ceee' },
  { file: `PromptFlow-${VERSION}-x86_64.rpm`,          sha: 'sha256:502c26e5c6f9ab002c66c1470ac44a4a9ca94858b22b4c284ee28374fe02a24e' },
  { file: `PromptFlow-${VERSION}-arm64.AppImage`,      sha: 'sha256:9c6924449c280212ac59adfcdb7b13dd640dd7a39a9090faa2dc64f322cd804c' },
  { file: `PromptFlow-${VERSION}-arm64.deb`,           sha: 'sha256:55d6342b4e00769d9c041d19ca161b1dfbac21fcadae355bcb24bb7eb4c4dbbd' },
]

function DownloadCard({ variant }) {
  const [state, setState] = useState('idle') // idle | go | done
  const url = assetUrl(variant.filename)

  function handleDownload() {
    const a = document.createElement('a')
    a.href = url
    a.download = variant.filename 
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setState('go')
    setTimeout(() => setState('done'), 2000)
  }

  return (
    <div className={`${styles.card} ${variant.recommended ? styles.recommended : ''}`}>
      {variant.recommended && <span className={styles.badge}>Recommended</span>}

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

      <div className={styles.cardFilename}>{variant.filename}</div>

      <button
        className={`${styles.dlBtn} ${state === 'go' ? styles.dlBtnLoading : ''} ${state === 'done' ? styles.dlBtnDone : ''}`}
        onClick={handleDownload}
        disabled={state === 'go'}
        aria-label={`Download ${variant.filename}`}
      >
        {state === 'idle' && <><DownloadIcon /> Download</>}
        {state === 'go'   && <><SpinnerIcon /> Starting…</>}
        {state === 'done' && <><CheckIcon /> Download started</>}
      </button>

      <a
        href={url}
        className={styles.directLink}
        download={variant.filename}
        aria-label={`Direct link for ${variant.filename}`}
      >
        Direct link ↗
      </a>
    </div>
  )
}

export default function DownloadPage() {
  const navigate = useNavigate()
  const [showChecksums, setShowChecksums] = useState(false)

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Return to Mission Briefing
      </button>

      <div className={styles.hero}>
        <div className={styles.eyebrow}>
          <span className={styles.ring} aria-hidden="true" />
          v{VERSION} · Build {BUILD_DATE}
        </div>
        <h1 className={styles.headline}>
          Select Your <span className={styles.gradient}>Launch Vector</span>
        </h1>
        <p className={styles.sub}>
          Choose the build optimised for your architecture. All packages are
          signed, notarised, and verified against the checksums below.
        </p>
      </div>

      {RELEASES.map(rel => (
        <section key={rel.os} className={styles.osSection}>
          <div className={styles.osHeader}>
            <span className={styles.osIcon} style={{ '--c': rel.color }} aria-hidden="true">
              {rel.icon}
            </span>
            <div>
              <h2 className={styles.osName} style={{ '--c': rel.color }}>{rel.os}</h2>
              <span className={styles.osCount}>
                {rel.variants.length} build{rel.variants.length > 1 ? 's' : ''} available
              </span>
            </div>
          </div>
          <div className={styles.cardGrid}>
            {rel.variants.map(v => (
              <DownloadCard key={v.filename} variant={v} />
            ))}
          </div>
        </section>
      ))}

      <section className={styles.checksumSection}>
        <button
          className={styles.checksumToggle}
          onClick={() => setShowChecksums(s => !s)}
          aria-expanded={showChecksums}
        >
          <span className={styles.checksumIcon} aria-hidden="true">🔐</span>
          SHA-256 Checksums
          <span
            className={styles.chevron}
            style={{ transform: showChecksums ? 'rotate(180deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        {showChecksums && (
          <div className={styles.checksumTable}>
            <div className={styles.checksumHeader}>
              <span>File</span>
              <span>SHA-256</span>
            </div>
            {CHECKSUMS.map(c => (
              <div key={c.file} className={styles.checksumRow}>
                <span className={styles.checksumFile}>{c.file}</span>
                <code className={styles.checksumHash}>{c.sha}</code>
              </div>
            ))}
            <div className={styles.checksumFooter}>
              <a
                href={assetUrl('checksums.txt')}
                className={styles.checksumDownload}
                download="checksums.txt"
              >
                ↓ Download full checksums.txt
              </a>
            </div>
          </div>
        )}
      </section>

      <p className={styles.footerNote}>
        PromptFlow Studio is free forever for solo pilots.&nbsp;
        <span className={styles.footerAccent}>Enterprise fleet licenses</span> available for teams navigating at scale.
      </p>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className={styles.spinSvg}>
      <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}