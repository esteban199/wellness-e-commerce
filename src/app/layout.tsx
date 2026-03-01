import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Westcoast Wellness – Premium CBD Products',
  description:
    'Premium quality CBD products crafted with natural ingredients. Shop tinctures, balms, skincare, and more.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} overflow-x-hidden`}>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
