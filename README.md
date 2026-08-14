# ComplaintCheck

Production-ready web app for searching and monitoring financial company complaint history from CFPB public data.

## Stack
- Next.js 16 (App Router) + React 19, TypeScript
- Tailwind CSS v4
- Supabase Auth & Postgres
- Stripe Checkout
- Recharts
- Deployed on Cloudflare Pages

## Setup

1. Copy `.env.example` to `.env.local` and fill keys.
2. `npm install`
3. `npm run dev`

### Environment variables
See `.env.example`.

## Database (Supabase)

```sql
create table watched_companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  company_name text not null,
  last_checked timestamp with time zone default now(),
  last_known_count integer default 0
);

create table alert_log (
  id uuid primary key default gen_random_uuid(),
  watched_company_id uuid references watched_companies(id),
  sent_at timestamp with time zone default now()
);
```

## Deploy to Cloudflare Pages

```bash
npm run build
wrangler pages deploy .next --project-name=complaintcheck
```
Or connect the GitHub repo to Cloudflare Pages and set build command `npm run build` with output dir `.next`.

## SEO
- `robots.txt`, `llms.txt`, `sitemap.xml`
- JSON-LD Organization schema
- Answer-first content and structured data per page

## Disclaimer
Complaint data reflects submitted complaints, not verified findings of wrongdoing. This is not financial or legal advice.
