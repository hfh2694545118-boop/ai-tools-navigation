# AI Pilot

AI Pilot is a dark, minimalist AI SEO tools directory designed for a focused overseas content site.

## Focus

- Primary niche: AI SEO tools, AI content optimization, keyword research, AI search visibility, and SEO workflows.
- Adjacent subtopic: AI ecommerce SEO for product pages, collection pages, FAQs, structured data, and Shopify or WooCommerce workflows.
- Paused topics: general AI tool directory and AI office automation.

## What is included

- English-only homepage.
- AI SEO tool directory with categories and filters.
- Sponsor-ready ad placements.
- 100 English AI SEO articles generated into `articles/`.
- Each article includes data, a concrete case, source links, practical steps, and FAQ content.
- Tool click tracking through noindex redirect pages under `go/`.

## Run locally

```powershell
node generate_articles.js
node generate_redirects.js
node local-server.js
```

Then open `http://127.0.0.1:8080`.

## Deploy

The project is static and can be deployed on Vercel's free plan.

```powershell
vercel.cmd deploy --prod --yes
```
