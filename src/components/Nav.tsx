'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="w-full border-b border-[#E5E2DB] bg-[var(--color-background)]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between">
        <Link href="/" className="font-[600] tracking-tight text-[18px] font-[var(--font-display)]">ComplaintCheck</Link>
        <nav className="hidden md:flex gap-8 text-[14px]">
          {nav.map(n => (
            <Link key={n.href} href={n.href} className={`hover:opacity-60 transition ${pathname===n.href ? 'opacity-100 underline decoration-[var(--color-accent)] underline-offset-4' : 'opacity-70'}`}>{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
