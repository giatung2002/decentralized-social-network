'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/app/ui/button";
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { FeatureCard } from '@/app/components/FeatureCard';
import { ShieldCheck, Users, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Your Social Life, Decentralized</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect, share, and communicate with full control over your data and privacy.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<ShieldCheck className="w-12 h-12 text-blue-500" />}
            title="Privacy First"
            description="Your data belongs to you. Choose what to share and with whom."
          />
          <FeatureCard
            icon={<Lock className="w-12 h-12 text-blue-500" />}
            title="End-to-End Encryption"
            description="Secure messaging with state-of-the-art encryption."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-blue-500" />}
            title="Decentralized Network"
            description="No central authority. You're in control of your social graph."
          />
        </section>

        {/* Navigation Links Example */}
        <section className="text-center mb-16">
          <h3 className="text-2xl font-semibold mb-4">Explore More</h3>
          <nav>
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="/features" className="text-blue-500 hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-500 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-500 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Add more sections as needed */}
      </main>

      <Footer />
    </div>
  );
}