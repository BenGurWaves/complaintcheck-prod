'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/cfpb/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setResult(data.summary);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 md:px-10">
      <section className="pt-20 md:pt-28 pb-16 max-w-[820px]">
        <h1 className="font-[var(--font-display)] text-[48px] md:text-[72px] leading-[1.05] tracking-[-0.02em] font-[700]">
          See a company’s complaint history before you sign up.
        </h1>
        <p className="mt-6 text-[18px] leading-relaxed opacity-80">
          Search any bank, lender, or financial company — free. Live data from the CFPB Consumer Complaint Database.
        </p>

        <form onSubmit={handleSearch} className="mt-10 flex gap-3">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter company name, e.g. Capital One"
            className="flex-1 h-[52px] px-4 border border-[#E5E2DB] outline-none focus:border-black bg-white text-[16px]"
          />
          <button
            type="submit"
            disabled={loading || query.length < 2}
            className="h-[52px] px-6 bg-black text-white disabled:opacity-40 hover:bg-neutral-900 transition"
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-[14px] text-red-700">{error}</p>
        )}

        {result && (
          <div className="mt-10 border border-[#E5E2DB] bg-white">
            <div className="p-6 border-b border-[#E5E2DB]">
              <h2 className="font-[var(--font-display)] text-[28px]">{result.companyName}</h2>
              <div className="mt-3 flex flex-wrap gap-6 text-[14px] opacity-80">
                <span>Total complaints (12 months): <strong>{result.total12Months.toLocaleString()}</strong></span>
                <span>Total all-time: <strong>{result.totalAllTime.toLocaleString()}</strong></span>
                <span>Trend: <strong className={result.trend === 'rising' ? 'text-red-700' : result.trend === 'falling' ? 'text-emerald-700' : ''}>
                  {result.trend} ({result.trendPercent > 0 ? '+' : ''}{result.trendPercent}%)
                </strong></span>
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Top issue categories</h3>
                <ul className="space-y-2 text-[14px]">
                  {result.topIssues.map((i:any, idx:number)=>(
                    <li key={idx} className="flex justify-between">
                      <span>{i.issue}</span>
                      <span className="opacity-60">{i.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <a href={result.cfpbUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[14px] underline decoration-[#C0FF00]/60 hover:no-underline">
                  View full official CFPB complaint listing
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="py-16 border-t border-[#E5E2DB]">
        <div className="max-w-[720px]">
          <h3 className="font-[var(--font-display)] text-[28px] mb-4">Live data pulled directly from the CFPB's official Consumer Complaint Database.</h3>
          <p className="opacity-80">No manual entry. Every result is a live API call to CFPB public data. Company responses and context are available in the full record.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="border border-[#E5E2DB] p-8 md:p-12 bg-white max-w-[720px]">
          <h3 className="font-[var(--font-display)] text-[28px]">Pricing</h3>
          <p className="mt-4 opacity-80">Free tier: unlimited single searches, 3 watched companies. Paid: $9.99/month or $89/year for unlimited watchlist, spike alerts, exports, and side-by-side comparison.</p>
          <Link href="/pricing" className="inline-block mt-6 h-[48px] px-6 bg-black text-white flex items-center hover:bg-neutral-900 transition">View plans</Link>
        </div>
      </section>
    </main>
  );
}
