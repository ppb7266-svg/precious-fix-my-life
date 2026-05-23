# Precious Fix My Life — Ebook Storefront

A lightweight Astro-based storefront for the "Precious Fix My Life" self-help ebook series.

## What This Is

- Landing page with all 5 ebooks displayed
- Individual book detail pages with Stripe/Gumroad buy links
- Email capture (ConvertKit) for lead magnet ("10-Minute Mental Reset")
- Legal pages (Privacy Policy, Terms of Service)
- About page

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Update configuration**
   - Replace `YOUR_FORM_ID` in `src/pages/index.astro` and `src/pages/books/[slug].astro` with your actual ConvertKit form ID
   - Replace Gumroad links in `src/data/books.ts` with your actual Gumroad product links
   - Replace Stripe links in `src/data/books.ts` with your actual Stripe payment links

3. **Add your ebook PDFs**
   - Place PDF files in `public/ebooks/`
   - In Gumroad/Stripe, link to the appropriate PDF for each product

4. **Run dev server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## SaaS Integration Checklist

| Service | What to Do |
|---------|-----------|
| **Gumroad** | Create 5 products, one per ebook. Get the product link for each. |
| **Stripe** | Create payment links or a Stripe-powered storefront. |
| **ConvertKit** | Create an email form for the lead magnet. Get the form ID. |
| **Buffer** | Connect social accounts, create a content calendar for book promos. |
| **Domain** | Point your domain (preciousfixmylife.com) to your host (Vercel/Netlify). |

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel (recommended)
npx vercel deploy

# Or Netlify
npx netlify deploy --prod
```

## Pages

- `/` — Home page with book grid + lead magnet
- `/books/[slug]` — Individual book detail page
- `/about` — About the series
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service