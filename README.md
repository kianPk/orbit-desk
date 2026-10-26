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

## Recent flagship projects

| Project | Stack | Demo |
| --- | --- | --- |
| [TradeForge](https://github.com/kianPk/tradeforge) | Solidity / Foundry | Protocol lab |
| [VaultForge](https://github.com/kianPk/vaultforge) | ERC-4626 vault | Foundry tests |
| [Loadforge](https://github.com/kianPk/loadforge) | Rust / Tokio | Load dashboard |
| [Lumen Commerce](https://github.com/kianPk/lumen-commerce) | Vue / Node | [Pages](https://kianpk.github.io/lumen-commerce/) |
| [Sentinel Grid](https://github.com/kianPk/sentinel-grid) | Vue SOC console | [Pages](https://kianpk.github.io/sentinel-grid/) |
| [Orbit Desk](https://github.com/kianPk/orbit-desk) | React / Three.js | [Pages](https://kianpk.github.io/orbit-desk/) |

Contact includes Telegram: [t.me/Kian_asli](https://t.me/Kian_asli).

## Customize

- Identity & copy → `src/constants/config.ts`
- Projects / experience → `src/constants/index.ts`
- Optional EmailJS → `.env` (`VITE_EMAILJS_*`)

## Credit

Original template by [ladunjexa](https://github.com/ladunjexa/reactjs18-3d-portfolio). Remixed for Kian Zarandi (`@kianPk`).

## Features

- Cinematic floating PC desk with intro animation, rim lights, and mobile auto-orbit
