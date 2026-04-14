import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DownloadPage.module.css'

// ─── CONFIG — update these two lines when you ship a real release ───────────
// GITHUB_REPO must be "owner/repo" exactly as it appears in your GitHub URL.
// VERSION must match the tag pushed (without the "v" prefix).
const GITHUB_REPO = 'RonnieHarrod-cell/PromptFlow-Desktop'   // ← change this
const VERSION     = import.meta.env.VITE_APP_VERSION?.replace(/^v/, '') ?? '1.1.1'
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
        size: '~90 MB',
        chip: 'Most modern PCs',
        recommended: true,
        filename: 'PromptFlow-Setup-main-x64.exe',
      },
      {
        label: 'ARM64',
        arch: 'arm64',
        ext: 'exe',
        size: '89.7 MB',
        chip: 'Surface Pro X · Snapdragon',
        filename: 'PromptFlow-Setup-main-arm64.exe',
      },
      {
        label: 'x86 (32-bit)',
        arch: 'ia32',
        ext: 'exe',
        size: '77.7 MB',
        chip: 'Legacy systems',
        filename: 'PromptFlow-Setup-main-ia32.exe',
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
        size: '119 MB',
        chip: 'Universal · No install needed',
        recommended: true,
        filename: 'PromptFlow-main-amd64.AppImage',
      },
      {
        label: 'x86-64 .deb',
        arch: 'x64',
        ext: 'deb',
        size: '93.4 MB',
        chip: 'Debian · Ubuntu · Mint',
        filename: 'PromptFlow-main-amd64.deb',
      },
      {
        label: 'x86-64 .rpm',
        arch: 'x64',
        ext: 'rpm',
        size: '79.4 MB',
        chip: 'Fedora · RHEL · openSUSE',
        filename: 'PromptFlow-main-x86_64.rpm',
      },
      {
        label: 'ARM64 AppImage',
        arch: 'arm64',
        ext: 'AppImage',
        size: '119 MB',
        chip: 'Raspberry Pi 4/5 · Ampere',
        filename: 'PromptFlow-main-arm64.AppImage',
      },
      {
        label: 'ARM64 .deb',
        arch: 'arm64',
        ext: 'deb',
        size: '88.6 MB',
        chip: 'Raspberry Pi OS · Ubuntu ARM',
        filename: 'PromptFlow-main-arm64.deb',
      },
    ],
  },
]

const CHECKSUMS = [
  { file: 'PromptFlow-Setup-main-x64.exe',       sha: 'sha256:32662fdd37c669e9d153bde5885e9e6b0f43a085a76b781f41a587d5115037c7' },
  { file: 'PromptFlow-Setup-main-arm64.exe',     sha: 'sha256:19ea1cb439d60a185868d55f3a6a7ccde3d89803d94a004cc500a92531ece61b' },
  { file: 'PromptFlow-Setup-main-ia32.exe',      sha: 'sha256:fd9e354f54d322cca06d54e9fcc50679ebdfcf17cf941a62af1de5ac34c64a69' },
  { file: 'PromptFlow-main-amd64.AppImage',      sha: 'sha256:d5863606d8836faff980fe7d24ed0551061dd81e5188b06f5932f6c91762ba9e' },
  { file: 'PromptFlow-main-amd64.deb',           sha: 'sha256:6b9ca62a5c54305b5c5b5ff3c80a1939a2035935de09cfd8ca5f065df439bac7' },
  { file: 'PromptFlow-main-x86_64.rpm',          sha: 'sha256:306d59936d05bb8a344a3500bb3433fc75890b40fb598f0d51ce8ece519a42da' },
  { file: 'PromptFlow-main-arm64.AppImage',      sha: 'sha256:76fe21adf028ce62978b4936398adf89f7b8bf099ceb7c6817818a61a7011acd' },
  { file: 'PromptFlow-main-arm64.deb',           sha: 'sha256:dff47df75e0509cc1c0a65cce911f252c04b32bea787a4ec5dab7eb7ea76a025' },
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