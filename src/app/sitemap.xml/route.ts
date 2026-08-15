import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://complaintcheck.pages.dev';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${siteUrl}/dashboard</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/pricing</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${siteUrl}/about</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
