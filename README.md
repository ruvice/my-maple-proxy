# my-maple-proxy

A tiny Vercel-hosted proxy for the **NEXON Open API** (MapleStory / MapleStorySEA).  
It forwards requests to `https://open.api.nexon.com`, injects your API key, applies a strict CORS allow-list, and sets CDN cache headers aligned to your update cadence.

> Why? So your client apps never expose an API key and you keep tight control over origins & caching.
> Acts as a BFF~

---

## Features

- 🔒 **Key shielding** — adds `x-nxopen-api-key` server-side (never expose keys in browser)  
- 🌐 **CORS allow-list** — only allows specific Origins/Referers you define  
- 🌎 **SEA/KMS switch** — `server=SEA|KMS` picks `/maplestorysea/` vs `/maplestory/` base path  
- 🧭 **Flexible path passthrough** — `path=...` plus any query params are forwarded as-is  
- 🧊 **Edge-friendly** — built for the Fetch API (`Request`/`Response`) and deploys cleanly to Vercel  
- 🗃️ **Caching** — sends `Cache-Control` with a TTL (e.g. until the next 2am SGT) for CDN caching

---

## Quick start

```bash
git clone https://github.com/ruvice/my-maple-proxy.git
cd my-maple-proxy
npm i

# (optional, but recommended)
npm i -g vercel
vercel link               # select/create the Vercel project
vercel env pull .env.local
