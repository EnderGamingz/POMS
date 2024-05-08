import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import cx from 'classnames';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Power Outage Monitoring System',
    template: '%s | POMS',
  },
  description: 'Power Outage Monitoring System',
  referrer: 'no-referrer',
  robots: {
    follow: false,
    index: false,
    indexifembedded: false,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      indexifembedded: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className={'h-full'}>
      <body className={cx(inter.className, 'relative flex h-full flex-col')}>
        <main>{children}</main>
      </body>
    </html>
  );
}
