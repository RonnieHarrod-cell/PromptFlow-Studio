import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StarField      from './components/StarField'
import NebulaGlow     from './components/NebulaGlow'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import ProductMockup  from './components/ProductMockup'
import FeatureGrid    from './components/FeatureGrid'
import StatsBar       from './components/StatsBar'
import SocialProof    from './components/SocialProof'
import CtaFooter      from './components/CtaFooter'
import DownloadPage   from './components/DownloadPage'
import styles         from './App.module.css'

function LandingPage() {
  return (
    <main>
      <Hero />
      <ProductMockup />
      <FeatureGrid />
      <StatsBar />
      <SocialProof />
      <CtaFooter />
    </main>
  )
}

export default function App() {
  return (
    <div className={styles.root}>
      <StarField count={140} />
      <NebulaGlow />
      <Navbar />
      <Routes>
        <Route path="/"         element={<LandingPage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </div>
  )
}
