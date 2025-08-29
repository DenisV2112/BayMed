# 🏥 BayMed — Medical Student Web Application
BayMed is a lightweight, framework-free web application that centralizes clinical guides, standardized scales, and an interactive medical calculator for medical students. It focuses on clarity, speed, and reliability, using vanilla HTML/CSS/JavaScript on the front end and an optional Node.js micro-backend. The result is a deploy-anywhere, zero-install client that works on any modern browser, ideal for low-friction academic use.


## Table of Contents

*-Vision & Scope*

*-Key Features* 

*-Screens & UX*

*-Architecture* 

*-Directory Layout*

*-Technical Decisions*

*-Accessibility*

*-Security Baseline*

*-Performance*

*-Local Setup*

*-Environment Variables*

*-Build & Deployment*

*-Testing*

*-Coding Standards*

*-Project Management (SCRUM)*

*-Backlog & User Stories (Samples)*

*-Roadmap*

*-Contributing*

*-License*

*-Team*

## Vision & Scope

### Audience:
Pre-clinical and clinical medical students who need fast, structured access to learning material and basic clinical tools.

### Problem: 
Medical learners frequently switch across multiple apps/pages for guides, scales, and calculators, losing time and context.
### Solution: 
Consolidate the essentials (guides, scales, calculators) in a clean SPA with offline-friendly assets, predictable navigation, and instant feedback on calculations. The MVP avoids complex frameworks to ensure portability and maintainability by small teams.
### Non-Goals (MVP): 
EHR integrations; authentication/roles; storing PHI.

## Key Features

*Guides*  – concise, structured clinical overviews.

*Scales* – standardized scales (e.g., GCS, APGAR) with guided inputs and scoring.

*Medical Calculator* – standard + medical modes, input validation, single history panel.

*SPA Router* – hash-based navigation, zero server config.

*Responsive UI*  – Tailwind-first design tuned for mobile → desktop.

*Optional Backend* – Node.js micro-service to serve JSON content/logs.

*Zero-install Frontend* – open index.html and use it.

⚠️ Disclaimer: Outputs are educational aids, not clinical directives.

## Screens & UX

*Home*: quick links to Guides / Scales / Calculator.

*Guides*: readable structure (headings, checklists, contraindications).

*Scales*: catalog + per-scale inputs, validation, computed score.

*Calculator*: standard arithmetic + medical modes (e.g., BMI/BSA/dosing). Fixed keypad prevents layout shift; history at top.

## Architecture

Client-first with an optional Node backend.

Frontend (Vanilla SPA)
- index.html
- /pages (Home, Guides, Scales, Calculator, 404)
- /router (hash-based)
- /assets (styles, fonts, images)
- state: in-memory + optional localStorage

        fetch (optional)

Backend (Optional, Node.js)
- /routes (REST-like endpoints)
- /controllers /models
- /database (JSON seed via /Data/data.json)


Data seed: Data/data.json. Can evolve to a DB (SQLite/Postgres) behind the same REST interface.

## Directory Layout

Current

BayMed/
├─ Backend/
│  ├─ controllers/        # js_controllers.js
│  ├─ database/           # js_db.js
│  ├─ models/             # js_models.js
│  └─ routes/             # js_routes.js
├─ Data/
│  └─ data.json
├─ Frontend/
│  └─ src/
│     ├─ assets/
│     │  ├─ fonts/
│     │  ├─ img/
│     │  │  ├─ icons/
│     │  │  └─ logo/     # baymed_logo.png
│     │  └─ styles/      # global_colors.css, global_fonts.css, main.css, reset.css
│     ├─ pages/          # calculator.js, guide.js, home.js, notFound.js, (guide.html)
│     ├─ router/         # router.js
│     ├─ index.html
│     └─ README.md
└─ .env


Recommended renames: js_controllers.js→controllers.js, js_routes.js→routes.js, js_models.js→models.js, js_db.js→db.js. Keep HTML files at Frontend/src (don’t mix with /pages JS). Normalize asset names (e.g., brain_anatomy.png, bacteria_illustration.png).

## Technical Decisions

Framework-free front end to minimize complexity and maximize portability.

Hash routing to avoid server config.

Tailwind + small CSS tokens (global_colors.css, global_fonts.css) for visual consistency.

State in memory; localStorage optional for calculator history.

MVC folders on backend for smooth growth without blocking MVP.

## Accessibility

Target WCAG 2.1 AA.

Semantic HTML; correct heading order; nav/main/section.

Keyboard access; visible focus; ARIA roles/labels where needed.

Contrast-safe palette; avoids color-only cues.

Respects prefers-reduced-motion.

## Security Baseline

No PHI stored/transmitted by default.

Strict input validation in calculator/forms.

If backend is enabled: CORS whitelist, rate limiting, Helmet/CSP, .env for secrets.

## Performance

No heavy framework; image assets optimized (.webp where possible).

defer scripts; fixed keypad for calculator to prevent layout shift.

Optional route prefetch, lazy-load large illustrations.

## Local Setup
### Prerequisites

Modern browser; optional Node 18+ for backend.

## Frontend (Static)
git clone https://github.com/DenisV2112/BayMed.git
cd BayMed/Frontend/src
### Option 1: open index.html directly
### Option 2: run a tiny dev server


## Backend (Optional)
cd BayMed/Backend
# npm install   # if you add dependencies
node routes/routes.js


## Environment Variables

Create .env at repo root or inside /Backend:

PORT=3000
NODE_ENV=development
API_BASE_URL=http://localhost:3000

## Build & Deployment

### Static Frontend:

GitHub Pages → host /Frontend/src as site root.

Netlify → drag-and-drop /Frontend/src or point “Publish directory” to it.

### Backend (optional):

Deploy on Render/Railway/Fly/Heroku.

Restrict CORS to the deployed frontend domain.

## Testing

### Manual MVP checks

Routing: Home ↔ Guides ↔ Scales ↔ Calculator ↔ 404

Guides: list & detail readability

Scales: input validation, correct scoring, reset

Calculator: arithmetic + medical modes; history shows once; long inputs don’t break layout

Responsive at 360/768/1024/1440

A11y: keyboard traversal; focus; contrast

### Automation (roadmap)

Jest unit tests for scoring/validators.

Playwright E2E for core flows.

Lighthouse CI budgets for performance/a11y.

## Coding Standards

JS: ES modules; no globals; const/let.

CSS: Tailwind utilities + small custom layers; consider ITCSS for custom CSS.

Naming: lower-kebab for files; camelCase vars/functions.

Commits: Conventional Commits.

Branches: main, dev, feat/*, fix/*.

## Project Management (SCRUM)

Sprint 1 — Planning & Analysis
Outcomes: product vision, MVP scope, backlog, repo scaffold.
Deliverables: epics (Guides/Scales/Calculator/Platform), user stories with AC, wireframes, coding standards.

Sprint 2 — Design & Initial Development
Outcomes: SPA skeleton, visual system, content model.
Deliverables: hash router; base components & tokens; Guides & Scales from Data/data.json; basic calculator.

Sprint 3 — Development & Testing
Outcomes: MVP feature complete.
Deliverables: medical modes in calculator; scale scoring; single history panel; a11y pass; responsive polish; bug fixes.

Sprint 4 — Release & Presentation
Outcomes: public deployment and documentation.
Deliverables: this README + technical doc; Netlify/GitHub Pages link; optional backend; elevator pitch.

## Backlog & User Stories (Samples)

### Guides

As a student, I want a searchable list of guides so I can quickly find a topic.

AC: keyword filter; instant results; empty state.

### Scales

As a student, I want to enter patient data and get a standardized score so I can practice assessments.

AC: validated inputs; computed score; interpretation band.

### Calculator

As a student, I want to switch between standard and medical modes so I can perform both general and clinical computations.

AC: mode switch persists in session; history shows last N results; no layout shift on long numbers.

### Platform

As a user, I want the app to load fast and work offline for basic content so I can use it in low connectivity environments.

AC (roadmap): cached shell; image fallbacks; < 2s TTI on 4G.

## Roadmap

Content authoring pipeline (YAML/Markdown → JSON).

Service Worker (offline shell for Guides/Scales).

Advanced calcs (CrCl, anion gap, peds dosing presets).

i18n: ES primary, EN secondary.

Privacy-first analytics (opt-in).

Full CI (lint/test/Lighthouse) + preview deployments.

## Contributing

Create a branch: feat/short-description.

Follow standards; write clear commits.

Open a PR with a concise description, screenshots (if UI), and test notes.

One reviewer min; squash merge.

# License (REVISAR)

MIT — see LICENSE.

## Team


Product / PM: Name

Frontend: Name

Backend: Name

QA / Docs: Name
