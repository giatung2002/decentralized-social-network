import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from '@/context/WalletContext';
import { Header } from '@/app/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}