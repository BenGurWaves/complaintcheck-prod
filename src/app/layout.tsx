import type { Metadata } from 'next';
import { Inter, Crimson_Pro } from 'next/font/google';
import './globals.css';
import AppShell from './AppShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400','600','700'],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'ComplaintCheck — See a Financial Company’s Complaint History Before You Sign Up', template: '%s | ComplaintCheck' },
  description: 'Search and monitor financial companies using live CFPB complaint data. See volume, top issues, and trends before you do business.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://complaintcheck.app'),
  openGraph: {
    title: 'ComplaintCheck',
    description: 'See a company’s complaint history before you sign up.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ComplaintCheck',
    description: 'Live CFPB complaint data for banks and lenders.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimson.variable}`}>
      <head />
      <body className="min-h-screen antialiased selection:bg-[var(--color-accent)] flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
