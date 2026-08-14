'use client';

export default function AboutPage() {
  return (
    <div className="max-w-[820px] mx-auto px-6 md:px-10 py-20">
      <h1 className="font-[var(--font-display)] text-[48px]">About</h1>
      <div className="mt-8 space-y-6 leading-relaxed opacity-90">
        <p>ComplaintCheck is a search and monitoring tool for consumers researching banks, lenders, credit card companies, or debt collectors before doing business with them, and for businesses tracking their own complaint trends over time.</p>
        <p>Data source: official CFPB Consumer Complaint Database. All results are live API calls to the public database; no manual entry.</p>
        <p><strong>Disclaimer:</strong> Complaint data reflects submitted complaints, not verified findings of wrongdoing. Company responses and context are available in the full CFPB record. This is not financial or legal advice.</p>
      </div>
    </div>
  );
}
