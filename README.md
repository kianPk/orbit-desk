# Orbit Desk

**Kian Zarandi** — immersive 3D developer portfolio (React · Three.js · Framer Motion · Tailwind).

Live: [kianpk.github.io/orbit-desk](https://kianpk.github.io/orbit-desk/)

Based on the open-source [reactjs18-3d-portfolio](https://github.com/ladunjexa/reactjs18-3d-portfolio) template (MIT), personalized for Solidity / Rust / Go / Flutter / Vue work.

## Stack

- Vite + React 18 + TypeScript
- React Three Fiber / Drei / Three.js
- Framer Motion · Tailwind CSS
- EmailJS (optional) — falls back to `mailto:`

## Run

```bash
npm install
npm run dev
```

Build for GitHub Pages (`base: /orbit-desk/`):

```bash
npm run build
```

## Customize

- Identity & copy → `src/constants/config.ts`
- Projects / experience → `src/constants/index.ts`
- Optional EmailJS → `.env` (`VITE_EMAILJS_*`)

## Credit

Original template by [ladunjexa](https://github.com/ladunjexa/reactjs18-3d-portfolio). Remixed for Kian Zarandi (`@kianPk`).
