import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Solidity Protocols",
    icon: web,
  },
  {
    title: "Rust & Go Systems",
    icon: backend,
  },
  {
    title: "Flutter & Vue Apps",
    icon: mobile,
  },
  {
    title: "Defensive Security",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Protocol Engineer",
    companyName: "TradeForge / VaultForge",
    icon: starbucks,
    iconBg: "#0B101C",
    date: "2025 — Present",
    points: [
      "Building multi-market perpetual clearing, ERC-4626 vaults, lending pools, and DAO stacks in Solidity + Foundry.",
      "Shipping skew funding, liquidations, oracle guards, and insurance cover with full test suites.",
      "Publishing interactive protocol demos on GitHub Pages.",
    ],
  },
  {
    title: "Systems & Platform",
    companyName: "Loadforge / Gateproxy",
    icon: tesla,
    iconBg: "#111827",
    date: "2024 — Present",
    points: [
      "High-concurrency HTTP load forge in Rust (Tokio + Axum) with live WebSocket metrics.",
      "Go API gateway with JWT, rate limits, reverse proxy, and circuit-breaker probes.",
      "Realtime hubs and Flutter ops dashboards for day-to-day tooling.",
    ],
  },
  {
    title: "Product Engineer",
    companyName: "Zyrax",
    icon: shopify,
    iconBg: "#0B101C",
    date: "2023 — Present",
    points: [
      "Vue / Node product surfaces, JWT auth panels, and Socket.IO presence apps.",
      "Freelance delivery for clients via zyrax.ir with practical demos first.",
      "Defensive security labs: honeypot decks, intel consoles, and vault tooling.",
    ],
  },
  {
    title: "Open Source",
    companyName: "GitHub @kianPk",
    icon: meta,
    iconBg: "#111827",
    date: "Ongoing",
    points: [
      "Maintaining public flagships across Solidity, Rust, Go, Flutter, and Vue.",
      "CI with Foundry / Go test / Vite builds and Pages demos for every major repo.",
      "Collaborating on protocol labs and systems tooling.",
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Kian ships protocol labs that feel production-shaped — clear risk params, tests, and a demo you can click.",
    name: "Open-source peer",
    designation: "Engineer",
    company: "Web3 community",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial:
      "The Rust load forge and Go gateway pair made our soak tests and edge routing actually measurable.",
    name: "Platform teammate",
    designation: "SRE",
    company: "Infra",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    testimonial:
      "Fast, practical Vue/Node delivery with live Pages — exactly what a freelance sprint needs.",
    name: "Product partner",
    designation: "Founder",
    company: "Zyrax clients",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "TradeForge",
    description:
      "Multi-market perpetual clearing in Solidity — isolated margin, skew funding, keeper liquidations, BoundOracle, and insurance cover. Foundry-tested.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "foundry",
        color: "green-text-gradient",
      },
      {
        name: "perps",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://github.com/kianPk/tradeforge",
  },
  {
    name: "VaultForge",
    description:
      "ERC-4626 yield vault with strategy allocation, performance fees, harvest loss guards, and role-gated ops — full Foundry coverage.",
    tags: [
      {
        name: "solidity",
        color: "blue-text-gradient",
      },
      {
        name: "erc4626",
        color: "green-text-gradient",
      },
      {
        name: "defi",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com/kianPk/vaultforge",
  },
  {
    name: "Loadforge",
    description:
      "High-concurrency HTTP load forge — Tokio workers, Axum + WebSocket live dashboard, latency histograms, and error-budget snapshots.",
    tags: [
      {
        name: "rust",
        color: "blue-text-gradient",
      },
      {
        name: "tokio",
        color: "green-text-gradient",
      },
      {
        name: "axum",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com/kianPk/loadforge",
  },
];

export { services, technologies, experiences, testimonials, projects };
