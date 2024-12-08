'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/app/ui/button";
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { FeatureCard } from '@/app/components/FeatureCard';
import { ShieldCheck, Users, Lock, Globe, Zap, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/avatar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Your Social Life, Decentralized</h1>
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
          <FeatureCard
            icon={<Globe className="w-12 h-12 text-blue-500" />}
            title="Global Connectivity"
            description="Connect with people around the world without borders."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-blue-500" />}
            title="Lightning Fast"
            description="Experience rapid content delivery and real-time interactions."
          />
          <FeatureCard
            icon={<Share2 className="w-12 h-12 text-blue-500" />}
            title="Seamless Sharing"
            description="Share content across platforms while maintaining ownership."
          />
        </section>

        <section id="how-it-works" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Create Your Node</CardTitle>
              </CardHeader>
              <CardContent>
                Set up your personal node, which acts as your own server in the network.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2. Connect with Others</CardTitle>
              </CardHeader>
              <CardContent>
                Find and connect with friends, family, or interesting individuals across the network.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3. Share Securely</CardTitle>
              </CardHeader>
              <CardContent>
                Post updates, share media, and communicate knowing your data is encrypted and under your control.
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="testimonials" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>TL</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Tung Le</CardTitle>
                    <CardDescription>Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                 I love this decentralized social network!
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>LT</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Le Tung </CardTitle>
                    <CardDescription>Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                I really like this app!
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}