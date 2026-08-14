'use client';

export default function PricingPage() {
  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-10 py-20">
      <h1 className="font-[var(--font-display)] text-[48px]">Pricing</h1>
      <p className="mt-4 opacity-80">Simple, transparent. No credit card required for free tier.</p>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="border border-[#E5E2DB] p-8 bg-white">
          <h2 className="font-[var(--font-display)] text-[28px]">Free</h2>
          <p className="mt-2 opacity-70">$0 / month</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>✓ Unlimited single searches</li>
            <li>✓ 3 watched companies</li>
            <li>✓ Basic trend indicator</li>
            <li>✓ Link to official CFPB listing</li>
          </ul>
        </div>

        <div className="border-2 border-black p-8 bg-white">
          <h2 className="font-[var(--font-display)] text-[28px]">Pro</h2>
          <p className="mt-2 opacity-70">$9.99 / month or $89 / year</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>✓ Unlimited watched companies</li>
            <li>✓ Spike alerts by email</li>
            <li>✓ Issue-category breakdown export (CSV)</li>
            <li>✓ Side-by-side comparison up to 3 companies</li>
          </ul>
          <a
            href="#"
            onClick={e=>{e.preventDefault(); alert('Stripe Checkout would open here. Connect STRIPE_SECRET_KEY and STRIPE_PRICE_MONTHLY_ID in .env.local');}}
            className="inline-block mt-8 h-[48px] px-6 bg-black text-white flex items-center hover:bg-neutral-900 transition"
          >
            Start Pro
          </a>
        </div>
      </div>
    </div>
  );
}
