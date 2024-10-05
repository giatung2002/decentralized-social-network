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
          Our mission is to build a future where privacy and freedom are at the core of social connections.
        </p>

        <section className="mb-16">
          <p className="text-lg mb-6">
            We believe in a world where people own their data, control their social interactions, and are free from centralized oversight. Our decentralized platform puts power back into your hands, allowing you to connect and share without compromising your privacy.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Mission</h2>
          <p className="text-lg mb-6">
            Our mission is to redefine social networking by creating a decentralized platform that prioritizes user control, transparency, and community governance.
          </p>
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Vision</h2>
          <p className="text-lg mb-6">
            We envision a future where individuals can freely interact across decentralized networks, maintaining full ownership of their digital identities and content.
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
            Frustrated by the lack of transparency and privacy in traditional social media, our team set out to build a decentralized alternative that empowers users to control their digital identities. We recognized the problems with centralized networks - data misuse, censorship, and privacy concerns - and created a solution that prioritizes user sovereignty and community-driven development.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Our Community</h2>
          <p className="text-lg mb-6">
            Our platform thrives because of the community. Users not only participate in the network but also help shape its future by voting on governance proposals and contributing to the platform's development. We believe in the power of collective decision-making and the wisdom of the crowd.
          </p>
          <Button variant="outline" className="mt-4">
            <Link href="/community">Join Our Community</Link>
          </Button>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Be Part of the Future</h2>
          <p className="text-lg mb-8">
            Join us in redefining social networking. Be part of a platform where your voice matters, your data is yours, and your privacy is paramount.
          </p>
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
            Join the Movement
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Decentralized Forum</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Web3 Community</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Developer Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Decentralization Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Governance Model</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/community" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DecentraNet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}