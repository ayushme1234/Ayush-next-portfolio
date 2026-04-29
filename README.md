# Ayush — Portfolio (Next.js 14)

Apple-style minimal portfolio with a working AI chatbot, voice intro, real project screenshots, and a live contact form. Built on Next.js 14 App Router. **Deploys free on Vercel in under 5 minutes.**

## Features

- **Apple-like design language** — restrained palette (mostly black/white + subtle accents), clean SF-Pro-style typography, generous whitespace, smooth scroll
- **Hero** — large display name (`Ayush.`), status pill, role, two CTAs (`Get in touch` + `View work`), feature pills (`Ask AI Ayush` + `Play my story`)
- **Optimized 3D character** — built from primitives, fewer polys than the Vite version, blinks & breathes, pupils follow your cursor, glasses correctly oriented
- **Marquee strip** — auto-scrolling skill ribbon
- **Services** — 3 clean rows with arrow CTAs
- **Projects grid** — 9 projects with **real live screenshots** via Thum.io, hover lift, accent pills
- **About** — copy + 4 stat cards
- **Contact** — server-validated form, sends via Resend (or logs to function logs without a key)
- **AI Chatbot** — slides out from the right, streams real Llama 3.3 70B responses via Groq. Falls back to a local responder if backend fails.
- **Voice player** — plays a pre-recorded MP3 if present, falls back to ElevenLabs proxy, then to Web Speech API

## Tech

- **Next.js 14** (App Router, JavaScript only — no TypeScript needed)
- **React 18** + Framer Motion
- **Three.js** + React Three Fiber + Drei (3D character)
- **Tailwind CSS** + Lenis (smooth scroll)
- **Zustand** for UI state
- **Edge runtime** for streaming chat

## 🆓 Deploy free on Vercel — 5 minutes

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Import your repo
3. **Framework:** auto-detected as Next.js — leave defaults
4. **Root Directory:** leave blank (the project is at the root)
5. Click **Deploy** — live in 60s

### 3. Get a Groq API key (free, no credit card)

1. https://console.groq.com → Sign up with Google
2. **API Keys** → **Create API Key** → name `portfolio` → copy the `gsk_...` key

### 4. Get a Resend API key (free)

1. https://resend.com → Sign up
2. **API Keys** → **Create** → copy the `re_...` key

### 5. Add env vars to Vercel

Project → **Settings** → **Environment Variables** — add:

| Key | Value |
| --- | --- |
| `GROQ_API_KEY` | your `gsk_...` key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |
| `RESEND_API_KEY` | your `re_...` key |
| `CONTACT_TO_EMAIL` | the email you used at Resend |

### 6. Redeploy

Deployments → ⋯ → **Redeploy** → confirm. Done.

### 7. Verify

Visit `https://YOUR-SITE.vercel.app/api/chat` in your browser. You should see:

```json
{"ok":true,"provider":"groq","configured":true,"message":"Chat API live. Provider: groq."}
```

If `configured: false`, go back and check your env vars.

---

## Local development

```bash
npm install
cp .env.example .env.local  # then fill in your keys
npm run dev
# → http://localhost:3000
```

## Customization

- **Bio**: edit `data/bio.js`
- **Projects**: edit `data/projects.js` — replace the `image` field with custom paths in `public/images/projects/` if you don't want Thum.io's auto-screenshots
- **Voice intro**: drop your MP3 at `public/audio/intro.mp3` — the player auto-detects it
- **Colors**: edit `tailwind.config.js` color tokens or `app/globals.css` CSS variables
- **3D character**: it's all in `components/HeroCharacter.jsx` — swap geometries to taste

## Project structure

```
.
├── app/
│   ├── api/
│   │   ├── chat/route.js       (Edge — streaming Llama via Groq)
│   │   ├── contact/route.js    (Edge — Resend email)
│   │   └── voice/route.js      (Edge — ElevenLabs proxy)
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── HeroCharacter.jsx       (optimized 3D character)
│   ├── Marquee.jsx
│   ├── Services.jsx
│   ├── ProjectsGrid.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ChatPanel.jsx
│   ├── VoicePlayer.jsx
│   └── SmoothScroll.jsx
├── data/
│   ├── bio.js
│   └── projects.js
├── lib/
│   ├── api.js
│   └── store.js
├── next.config.mjs
├── tailwind.config.js
├── package.json
└── README.md
```

## Limits on free tiers

- **Groq Llama 3.3 70B**: 1,000 requests/day. Switch `GROQ_MODEL` to `llama-3.1-8b-instant` for 14,400/day.
- **Resend**: 3,000 emails/month, 100/day. Without a verified domain, only delivers to your signup email.
- **Vercel Hobby**: unlimited static, 100 GB-hours of serverless / month — way more than a portfolio uses.
- **Thum.io screenshots**: rate-limited per IP. For high-traffic sites, replace with custom screenshots.

## License

Personal portfolio — please don't copy verbatim. Inspiration is welcome.

---

Built by Ayush · [GitHub](https://github.com/ayushme1234) · [LinkedIn](https://www.linkedin.com/in/ayush-8b9623223/)
