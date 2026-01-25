import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CipherPulse - Modern Messaging App',
  description: 'A stunning real-time messaging application with end-to-end encryption and beautiful UI',
  icons: {
    icon: '🔐',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
