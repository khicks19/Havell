# Havell — Instant Quote MVP (Vercel + Vite + React)

This is a deploy‑ready starter for a **custom quoting engine** for Havell (Formlabs Form 4L workflow).

## What’s inside
- **Vite + React + Tailwind** frontend
- **QuoteWidget** with STL upload, unit toggle (mm/in), model analysis (volume, area, bbox, Z height)
- **Serverless API** on Vercel: `/api/quote` (pricing heuristic), `/api/rfq` (placeholder)
- Clean UI and a simple landing section

> STL parsing is done in the browser (binary + basic ASCII). No external services required.

---

## Quick start (local)
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy to Vercel (recommended)
1. Create a GitHub repo and push this folder.
2. In Vercel, **New Project** → import your repo.
3. Vercel detects **Vite** automatically. Build command: `vite build`. Output: `dist`.
4. The `/api` folder is deployed as **Serverless Functions** automatically.
5. Add your custom domain (e.g., `havell.co`) and follow DNS prompts.

No environment variables are required for this MVP.

---

## Using the quote widget
1. Go to the **Instant Quote** section.
2. Upload an `.stl` file. If your model was exported in inches, select **inches** before Analyze.
3. Click **Analyze Model** to see metrics.
4. Choose **Material, Finish, Lead time, Quantity**.
5. Click **Get Price** to view a unit price, batch total, and a cost breakdown.

### Change pricing parameters
Edit `src/quote/PricingConfig.js` for front‑end defaults and `api/quote.js` for server authoritative pricing.
- Materials: resin cost per cc + handling factor
- Finishing levels: area‑based time coefficients
- Lead times: price multipliers
- Machine/labor/overhead/margin constants

> **Note:** These are placeholder values. Replace with your actual costs and policy multipliers.

---

## Next steps / Upgrades
- **Stripe checkout**: add `/api/checkout` that creates a Payment Intent and redirects to Stripe.
- **DB for quotes**: add Supabase/Neon and store quotes + customer info.
- **3D preview**: add `three` + `react-three-fiber` and `STLLoader` for live model viewing/orientation.
- **STEP support**: parse `.step` using a WASM library (e.g., OpenCascade.js) on a serverless function.
- **Risk scoring**: thin walls, overhang heuristics; route “high risk” to manual review.
- **Compliance**: NDA checkbox, ITAR flag to block foreign storage and enforce stricter flow.
- **Email**: integrate Postmark/Resend to send RFQ confirmations.

---

## Project structure
```
havell-quote-mvp/
├─ api/
│  ├─ quote.js         # pricing engine (serverless)
│  └─ rfq.js           # placeholder RFQ endpoint
├─ public/
│  └─ logo.png         # replace with your real logo
├─ src/
│  ├─ components/
│  │  └─ QuoteWidget.jsx
│  ├─ quote/
│  │  ├─ PricingConfig.js
│  │  └─ parseStl.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ README.md
```

---

## Notes
- This MVP assumes STL units are **mm** by default; toggle inches if needed.
- The pricing function enforces a small **minimum ticket** to avoid $0 quotes for tiny parts.
- Z‑speed/finishing coefficients are simplified—tune them to your shop’s reality.
