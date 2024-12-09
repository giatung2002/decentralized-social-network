'use client';

import React from 'react'
import { Button } from "@/app/ui/button"
import { Shield, Users, Globe, ChevronLeft } from 'lucide-react'
import { Header } from '@/app/components/Header'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-12 h-12 text-indigo-600" />,
      title: "Privacy First",
      description: "Users own and control their personal data.",
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: "Decentralized Governance",
      description: "Community members help shape the platform's direction through fair and transparent decision-making.",
    },
    {
      icon: <Globe className="w-12 h-12 text-indigo-600" />,
      title: "Open and Inclusive",
      description: "A platform that is open-source, transparent, and accessible to all, with no gatekeepers.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-800">
          About Us – Empowering You with Decentralization
        </h1>
        <p className="text-xl text-gray-600 mb-12">
        Our mission is simple: to create a space where you can connect, share, and thrive without sacrificing your privacy or freedom.
        </p>

        <section className="mb-16">
          <p className="text-lg mb-6">
          We understand that your data is yours, and your online interactions should be in your control
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Mission</h2>
          <p className="text-lg mb-6">
          At DecentraNet, our mission is to redefine what it means to be online by offering a decentralized platform where you call the shots
          </p>
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Vision</h2>
          <p className="text-lg mb-6">
          We see a future where you own your digital presence—no middlemen, no hidden agendas.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Origins</h2>
          <p className="text-lg mb-6">
          We started DecentraNet with a simple belief: you deserve better. Like many of you, we were frustrated by the lack of transparency, privacy, and control in traditional social media          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Community</h2>
          <p className="text-lg mb-6">
            Our platform thrives because of the community. Users not only participate in the network but also help shape its future by voting on governance proposals and contributing to the platform's development. We believe in the power of collective decision-making and the wisdom of the crowd.
          </p>
          <a 
            href="https://discord.gg/TnA3TFV27e" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="mt-4">
              Join Our Community
            </Button>
          </a>
        </section>
      </main>
    </div>
  )
}