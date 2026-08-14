'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E2DB] mt-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 text-[13px] leading-relaxed opacity-80">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold font-[var(--font-display)] mb-3">ComplaintCheck</div>
            <p>Live data pulled directly from the CFPB's official Consumer Complaint Database.</p>
          </div>
          <div>
            <div className="font-medium mb-3">Navigation</div>
            <ul className="space-y-1">
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
              <li><a href="/pricing" className="hover:underline">Pricing</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="mailto:contact@calyvent.com?subject=ComplaintCheck%20Inquiry" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Disclaimer</div>
            <p>Complaint data reflects submitted complaints, not verified findings of wrongdoing. Company responses and context are available in the full CFPB record. This is not financial or legal advice.</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#E5E2DB] flex justify-between items-center">
          <span>© {new Date().getFullYear()} ComplaintCheck</span>
          <a href="https://www.consumerfinance.gov/about/" target="_blank" rel="noreferrer noopener" className="hover:underline">CFPB Consumer Complaint Database</a>
        </div>
      </div>
    </footer>
  );
}
