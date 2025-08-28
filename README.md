# Revenue Calculator

A lightweight, owner-friendly calculator that allows you to work backwards from your revenue goals to how to hit it with products or SAAS. 

---

## Why it matters (for owners)
- **End in Mind** Quickly see what levers to pull to hit your goals.
- **Instant Milestones** Know exactly what your milestones for time (day, month) and sales (customers) to hit those goals.

---

## Features
- **Core model:**  
  `Revenue = Traffic × Conversion Rate × Average Order Value (AOV)`  
  Optional SaaS mode: `MRR = Signups × Activation Rate × Plan Price`
- **Scenario sliders:** Traffic, Conversion, Price, AOV/ARPU, Discounting, Churn (SaaS).
- **Outputs:** Revenue, Gross Profit (w/ margin), Break-even CAC, Payback Period, LTV (SaaS).
- **Shareable state:** URL params for saving/sharing scenarios (optional).
- **Zero-backend option:** Runs as a static page (Cloudflare Pages ready).

---

## Quickstart

> Works as a static site or with a simple Node/Vite build. Pick one.

### Option A: Static (no build)
1. Open `index.html` locally or serve the folder with any static server.
2. Edit defaults in `/config/defaults.json` or `.env` (see below).

### Option B: Node + Vite (example)
```bash
# 1) Install deps
npm install

# 2) Run locally
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview
