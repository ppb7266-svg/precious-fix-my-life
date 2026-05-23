# Precious Fix My Life — Setup & Integration Guide

## What Was Built

```
precious-fix-my-life/
├── src/
│   ├── data/books.ts          ← All 5 ebook definitions (prices, links, chapters)
│   ├── layouts/Base.astro     ← Shared header, footer, layout
│   └── pages/
│       ├── index.astro        ← Home: book grid + lead magnet + testimonials
│       ├── about.astro        ← About page
│       ├── privacy.astro     ← Privacy policy
│       ├── terms.astro       ← Terms of service
│       └── books/[slug].astro ← Individual book detail pages
├── scripts/
│   └── social-automation.js  ← Buffer API auto-poster
└── public/
    ├── ebooks/               ← Place your PDF files here
    └── robots.txt
```

---

## Step 1 — Connect SaaS Tools

### Gumroad (Payments + Delivery)
1. Go to [gumroad.com](https://gumroad.com) and create an account
2. Create 5 products, one per ebook (Fix Your Mind, Fix Your Schedule, Fix Your Relationships, Fix Your Finances, Fix Your Habits)
3. For each product:
   - Upload the PDF file
   - Set the price to $19
   - Copy the product link (e.g., `https://precious.gumroad.com/l/fix-your-mind`)
4. Replace the `gumroadLink` values in `src/data/books.ts`

### Stripe (Alternative Payment)
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create payment links for each ebook via the Dashboard → Payment Links
3. Replace `stripeLink` values in `src/data/books.ts`
4. On each book detail page, the Gumroad link is primary — Stripe is a fallback if you prefer

### ConvertKit (Email List + Automation)
1. Sign up at [convertkit.com](https://convertkit.com) — the Free plan supports up to 300 subscribers
2. Create a new form called "Lead Magnet: 10-Minute Mental Reset"
3. In ConvertKit, go to the form's settings → Share → Form embed code
4. Copy the form ID from the URL (e.g., `https://app.convertkit.com/forms/XXXXX/subscriptions`)
5. Replace `YOUR_FORM_ID` in:
   - `src/pages/index.astro` (line with `action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"`)
   - `src/pages/books/[slug].astro` (related lead magnet form)
6. **Set up email automation sequence:**
   - In ConvertKit, create a new automation/sequence
   - Trigger: Subscriber joins your form
   - Email 1 (immediately): "Here's your free 10-Minute Mental Reset" + the PDF attached
   - Email 2 (3 days later): Brief intro to the ebook series + link to Fix Your Mind book page
   - Email 3 (7 days later): One specific transformation story + direct link to buy
   - Email 4 (14 days later): "Last chance" soft promo + discount offer or just the book links
   - Email 5 (21 days later): Weekly value email + book links (ongoing)

### Buffer (Social Auto-Posting)
1. Create a Buffer account at [buffer.com](https://buffer.com)
2. Connect your social profiles (Twitter/X, LinkedIn, Facebook)
3. Go to https://buffer.com/developers and create an API app
4. Get your Access Token from Buffer Dashboard → Settings → API
5. Edit `scripts/social-automation.js`:
   - Set `BUFFER_ACCESS_TOKEN`
   - Set profile IDs for each social account
6. Run: `node scripts/social-automation.js` to queue initial posts
7. Set up a recurring schedule (e.g., 3 posts/week across channels)

---

## Step 2 — Upload Your PDFs

1. Place your ebook PDF files in `public/ebooks/`
2. In Gumroad, upload each PDF to the matching product
3. Verify the download link works after purchase

---

## Step 3 — Deploy

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
cd precious-fix-my-life
npx vercel deploy --prod
```

### Or Netlify
```bash
npm install -g netlify-cli
npx netlify deploy --prod --dir=dist
```

---

## Step 4 — Domain & SSL

1. Point your DNS A record to your host's IP (Vercel/Netlify provides this)
2. Add your domain in Vercel/Netlify dashboard
3. SSL is auto-provisioned

---

## Step 5 — Marketing Automation Overview

### Email Funnel Flow
```
Visitor lands on site
       ↓
Signs up for free guide (ConvertKit form)
       ↓
Welcome email (PDF attachment)
       ↓
Day 3 → Intro to series
       ↓
Day 7 → Soft promo (Fix Your Mind)
       ↓
Day 14 → Book link
       ↓
Day 21 → Ongoing value emails + promos
```

### Social Posting Cadence (via Buffer)
| Day | Channel | Content |
|-----|---------|---------|
| Mon | Twitter/X | Book tip or quote |
| Wed | LinkedIn | Long-form insight post |
| Fri | Twitter/X | Lead magnet promo |
| Sat | Facebook | Community/engagement post |

---

## Customization Checklist

- [ ] Replace all Gumroad product links in `src/data/books.ts`
- [ ] Replace `YOUR_FORM_ID` in both `.astro` pages for ConvertKit
- [ ] Add real book cover images to `public/ebooks/` and reference them
- [ ] Add real PDF files to Gumroad products
- [ ] Update email sequences in ConvertKit with real content
- [ ] Set up Buffer API and run initial post queue
- [ ] Verify Stripe/Gumroad payment links work end-to-end
- [ ] Add your domain and configure SSL
- [ ] Set up analytics (Plausible or Google Analytics)
- [ ] Add a favicon in `public/favicon.svg`