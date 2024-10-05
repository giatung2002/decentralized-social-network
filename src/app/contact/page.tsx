'use client';

import React, { useState } from 'react'
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { Textarea } from "@/app/ui/textarea"
import { Mail, MessageCircle, HelpCircle } from 'lucide-react'
import { Header } from '@/app/components/Header'
import Link from 'next/link'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    // For this example, we'll just set the formSubmitted state to true
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-100 text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-800 text-center">
          Contact Us – We're Here to Help
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Got questions or feedback? Reach out to us.
        </p>

        {formSubmitted ? (
          <div className="bg-white-100 border border-white-400 text-white-700 px-4 py-3 rounded-lg shadow-md mb-8" role="alert">
          <p className="font-bold">Thank you for contacting us!</p>
          <p>We'll get back to you shortly.</p>
        </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input type="text" id="name" name="name" required className="w-full" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input type="email" id="email" name="email" required className="w-full" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input type="text" id="subject" name="subject" required className="w-full" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea id="message" name="message" required className="w-full h-32" placeholder="Your message here..." />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                Send Message
              </Button>
            </div>
          </form>
        )}

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Alternative Contact Methods</h2>
          <p className="mb-4">
            Prefer to email us directly? Reach out at{' '}
            <a href="mailto:support@decentralizedsocialnetwork.com" className="text-indigo-600 hover:underline">
              support@decentranet.com
            </a>
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
              <Mail className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
              <MessageCircle className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
              <HelpCircle className="w-8 h-8" />
            </a>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Need Quick Answers?</h2>
          <p className="mb-4">
            Check out our{' '}
            <Link href="/faq" className="text-indigo-600 hover:underline">
              FAQ
            </Link>{' '}
            for quick answers to common questions.
          </p>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Join Our Community</h2>
          <p className="mb-6">
            Join our community of users shaping the future of decentralized social networking.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
            <Link href="/community">Join the Community</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}