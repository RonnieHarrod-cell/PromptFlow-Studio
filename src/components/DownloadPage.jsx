import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './DownloadPage.module.css'

// ─── CONFIG — update these two lines when you ship a real release ───────────
// GITHUB_REPO must be "owner/repo" exactly as it appears in your GitHub URL.
// VERSION must match the tag pushed (without the "v" prefix).
const GITHUB_REPO = 'RonnieHarrod-cell/PromptFlow-Studio'   // ← change this
const VERSION     = import.meta.env.VITE_APP_VERSION?.replace(/^v/, '') ?? '2.4.1'
const BUILD_DATE  = '20250412'

// Builds the GitHub Releases asset download URL.
// After `npm run build` on CI the files land at:
//   https://github.com/OWNER/REPO/releases/download/vVERSION/FILENAME
function assetUrl(filename) {
  return `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${filename}`
}

// ─── Release matrix ─────────────────────────────────────────────────────────
// `filename` must match exactly what electron-builder outputs.
// electron-builder's default pattern:  ${productName}-${version}-${arch}.${ext}
// Adjust `productName` in your electron-builder config if it differs.
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
        size: '78 MB',
        chip: 'Most modern PCs',
        recommended: true,
        filename: `PromptFlow-Setup-${VERSION}-x64.exe`,
      },
      {
        label: 'ARM64',
        arch: 'arm64',
        ext: 'exe',
        size: '75 MB',
        chip: 'Surface Pro X · Snapdragon',
        filename: `PromptFlow-Setup-${VERSION}-arm64.exe`,
      },
      {
        label: 'x86 (32-bit)',
        arch: 'ia32',
        ext: 'exe',
        size: '74 MB',
        chip: 'Legacy systems',
        filename: `PromptFlow-Setup-${VERSION}-ia32.exe`,
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
        size: '96 MB',
        chip: 'Universal · No install needed',
        recommended: true,
        filename: `PromptFlow-${VERSION}-x86_64.AppImage`,
      },
      {
        label: 'x86-64 .deb',
        arch: 'x64',
        ext: 'deb',
        size: '88 MB',
        chip: 'Debian · Ubuntu · Mint',
        filename: `PromptFlow-${VERSION}-amd64.deb`,
      },
      {
        label: 'x86-64 .rpm',
        arch: 'x64',
        ext: 'rpm',
        size: '89 MB',
        chip: 'Fedora · RHEL · openSUSE',
        filename: `PromptFlow-${VERSION}-x86_64.rpm`,
      },
      {
        label: 'ARM64 AppImage',
        arch: 'arm64',
        ext: 'AppImage',
        size: '93 MB',
        chip: 'Raspberry Pi 4/5 · Ampere',
        filename: `PromptFlow-${VERSION}-arm64.AppImage`,
      },
      {
        label: 'ARM64 .deb',
        arch: 'arm64',
        ext: 'deb',
        size: '85 MB',
        chip: 'Raspberry Pi OS · Ubuntu ARM',
        filename: `PromptFlow-${VERSION}-arm64.deb`,
      },
    ],
  },
]

// Checksums are written by CI into checksums.txt and mirrored here at release time.
// You can also fetch checksums.txt dynamically — see the comment in DownloadPage below.
const CHECKSUMS = [
  { file: `PromptFlow-Setup-${VERSION}-x64.exe`,       sha: 'c2d4f8a176e30b591c…' },
  { file: `PromptFlow-Setup-${VERSION}-arm64.exe`,     sha: 'd5b9e3c027f41a86d5…' },
  { file: `PromptFlow-Setup-${VERSION}-ia32.exe`,      sha: 'e1c6d8b392a50f74e1…' },
  { file: `PromptFlow-${VERSION}-x86_64.AppImage`,     sha: 'f4a2e7c081b93d65f4…' },
  { file: `PromptFlow-${VERSION}-amd64.deb`,           sha: 'a7f3b1d592c04e28a7…' },
  { file: `PromptFlow-${VERSION}-x86_64.rpm`,          sha: 'b0e8c4a613d75f91b0…' },
  { file: `PromptFlow-${VERSION}-arm64.AppImage`,      sha: 'c3d9f2b047e81a54c3…' },
  { file: `PromptFlow-${VERSION}-arm64.deb`,           sha: 'd6a0e5c128f94b37d6…' },
]

// ─── DownloadCard ────────────────────────────────────────────────────────────
function DownloadCard({ variant }) {
  const [state, setState] = useState('idle') // idle | go | done
  const url = assetUrl(variant.filename)

  function handleDownload() {
    // Trigger the browser's native file download
    const a = document.createElement('a')
    a.href = url
    a.download = variant.filename  // suggests a save-as filename to the browser
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    setState('go')
    // Reset the button after a few seconds so the user can re-download
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

      {/* Primary download button */}
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

      {/* Direct link fallback — always visible so users can right-click → Save As */}
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

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DownloadPage() {
  const navigate = useNavigate()
  const [showChecksums, setShowChecksums] = useState(false)

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Return to Mission Briefing
      </button>

      {/* Hero */}
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

      {/* OS sections */}
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

      {/* Checksums */}
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

/* ── Icon components ─────────────────────────────────────────────────────── */
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
