# PromptFlow Studio — Landing Page

A cinematic, space-themed landing page built with **React + Vite + CSS Modules**.

## Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components |
| Vite 5 | Dev server & bundler |
| CSS Modules | Scoped, zero-dependency styling |
| Google Fonts | Syne (display) + DM Mono + DM Sans |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root layout — assembles all sections
├── App.module.css            # Root background (nebula gradient)
├── index.css                 # Global resets + CSS design tokens
│
└── components/
    ├── StarField.jsx/.css    # Procedural animated star field (fixed bg)
    ├── NebulaGlow.jsx/.css   # Atmospheric violet/magenta blobs (fixed bg)
    ├── Navbar.jsx/.css       # Sticky glass nav with scroll detection
    ├── Hero.jsx/.css         # Hero headline, sub-copy, primary CTA
    ├── ProductMockup.jsx/.css# Floating editor + live stream preview panel
    ├── FeatureGrid.jsx/.css  # 4-card constellation feature grid
    ├── StatsBar.jsx/.css     # Animated stat counters strip
    ├── SocialProof.jsx/.css  # Auto-rotating quote carousel
    └── CtaFooter.jsx/.css    # Final CTA + footer note
```

## Design Tokens (index.css)

All colours, fonts, and easing curves live as CSS custom properties on `:root`:

```css
--void          #050505   /* deep space background */
--violet        #8B5CF6   /* electric violet accent */
--magenta       #ec4899   /* soft magenta glow */
--starlight     #A1A1AA   /* body text */
--lavender      #c4b5fd   /* highlight text */

--font-display  'Syne'       /* headlines */
--font-body     'DM Sans'    /* body copy */
--font-mono     'DM Mono'    /* code panels */
```

## Key Visual Techniques

- **Starfield** — 140 `<span>` elements with randomised `opacity`, `size`, `animation-duration`, and `animation-delay` via CSS custom properties.  
- **Nebula blobs** — `radial-gradient` fixed `div`s with a slow `scale + translate` keyframe loop.  
- **Glass nav** — `backdrop-filter: blur(16px)` + semi-transparent background.  
- **Mockup glow** — layered `box-shadow` on the editor frame with a breathing `scale` animation on the outer glow div.  
- **Gradient text** — `background-clip: text` + `linear-gradient` on headline spans.  
- **CTA glow button** — multi-layer `box-shadow` that expands on `:hover`.  
- **Stream animation** — timed `setTimeout` chain replays every 6 s to simulate live token streaming.
