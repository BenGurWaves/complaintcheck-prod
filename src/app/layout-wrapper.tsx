'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
