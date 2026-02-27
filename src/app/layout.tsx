import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
