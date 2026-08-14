'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function mockData() {
  const data = [];
  for (let i = 11; i >=0; i--) {
    data.push({
      month: new Date(Date.now()-i*30*24*60*60*1000).toLocaleString('default',{month:'short'}),
      complaints: Math.floor(120 + Math.random()*80),
    });
  }
  return data;
}

export default function DashboardPage() {
  const [watchlist, setWatchlist] = useState([
    { id:'1', company:'Capital One', total12:452, trend:'rising', lastChecked:'2026-08-10' },
    { id:'2', company:'Chase Bank', total12:389, trend:'flat', lastChecked:'2026-08-09' },
  ]);

  useEffect(() => {}, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
      <h1 className="font-[var(--font-display)] text-[40px]">My Watchlist</h1>
      <p className="opacity-70 mt-2">Saved companies for monitoring. Sign in to save more.</p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {watchlist.map(item => (
          <div key={item.id} className="border border-[#E5E2DB] bg-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-[var(--font-display)] text-[24px]">{item.company}</h3>
                <p className="text-[14px] opacity-70">Last checked {item.lastChecked}</p>
              </div>
              <span className={`text-[12px] px-2 py-1 border ${item.trend==='rising'?'border-red-300 text-red-700': 'border-emerald-300 text-emerald-700'}`}>{item.trend}</span>
            </div>

            <div className="mt-6 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData()}>
                  <XAxis dataKey="month" tick={{fontSize:12}} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="complaints" stroke="#1A1A1D" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 text-[14px] opacity-80">
              Complaints last 12 months: <strong>{item.total12}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-[#E5E2DB] pt-8">
        <h2 className="font-[var(--font-display)] text-[24px]">Alert Feed</h2>
        <p className="opacity-70">No spikes detected in the last 7 days.</p>
      </div>

      <Link href="/" className="inline-block mt-10 underline">Add Company</Link>
    </div>
  );
}
