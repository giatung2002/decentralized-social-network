'use client';

import React, { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/Dialogs"
import { Lock, Link, Coins, Users, FileText, Share2 } from 'lucide-react'
import { Header } from '@/app/components/Header'

export default function FeaturesPage() {
  const [openDialog, setOpenDialog] = useState<number | null>(null)

  const features = [
    {
      icon: <Link className="w-12 h-12 text-indigo-500" />,
      title: "Decentralized Control",
      description: "Users own their data—no central servers or third-party oversight. Control your content, connections, and privacy.",
      details: "In our decentralized network, data is stored across multiple nodes, ensuring no single entity has control over your information. This distributed approach enhances security and gives you full ownership of your digital presence."
    },
    {
      icon: <Lock className="w-12 h-12 text-indigo-500" />,
      title: "End-to-End Encryption",
      description: "All messages and content are encrypted, ensuring complete privacy for your interactions.",
      details: "Our platform uses state-of-the-art encryption algorithms to secure your data. Messages are encrypted on your device and can only be decrypted by the intended recipient, ensuring that even we can't access your private communications."
    },
    {
      icon: <Coins className="w-12 h-12 text-indigo-500" />,
      title: "Token-Based Access",
      description: "Log in with your crypto wallet—no need for usernames or passwords. Experience seamless, anonymous access.",
      details: "By using blockchain technology, we've eliminated the need for traditional login methods. Your crypto wallet serves as your secure, anonymous identity on our platform, reducing the risk of data breaches and identity theft."
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-500" />,
      title: "Community Governance",
      description: "Users participate in decisions that shape the platform. Governance is handled through smart contracts and decentralized voting.",
      details: "Our platform is truly user-driven. Through blockchain-based voting systems, you have a say in the platform's development, policy changes, and feature implementations. This ensures that the network evolves according to the community's needs and values."
    },
    {
      icon: <FileText className="w-12 h-12 text-indigo-500" />,
      title: "Content Ownership",
      description: "You fully own your posts, photos, and videos. Share or retract content with complete control.",
      details: "Unlike traditional social networks, we don't claim any rights to your content. Your posts, images, and videos remain yours, stored on the decentralized network. You can share, modify, or delete your content at any time, with no restrictions."
    },
    {
      icon: <Share2 className="w-12 h-12 text-indigo-500" />,
      title: "Peer-to-Peer Sharing",
      description: "All content is shared peer-to-peer, without the need for central servers, ensuring faster and more secure data exchange.",
      details: "Our peer-to-peer architecture allows for direct content sharing between users. This not only increases the speed of data transfer but also enhances privacy and reduces the risk of server downtime or censorship."
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Our Features – Decentralized, Secure, Empowering
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center">
          Experience the power of social networking without compromise
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <DialogTrigger onClick={() => setOpenDialog(index)}>
                <div 
                  className="bg-gray-800 bg-opacity-50 p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-2xl font-bold ml-4">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </DialogTrigger>
              <Dialog isOpen={openDialog === index} onClose={() => setOpenDialog(null)}>
                <DialogHeader>
                  <DialogTitle>{feature.title}</DialogTitle>
                </DialogHeader>
                <DialogContent>
                  <p className="text-gray-700">{feature.details}</p>
                </DialogContent>
              </Dialog>
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
            Join the Decentralized Revolution
          </Button>
        </div>
      </main>

      <footer className="bg-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blockchain Whitepaper</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crypto Wallet Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Decentralization FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mastodon</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Web3 Forum</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Developer Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} DecentralNet. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}