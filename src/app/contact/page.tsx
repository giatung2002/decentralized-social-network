'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Header } from '@/app/components/Header';

export default function ContactPage() {
  const [state, handleSubmit] = useForm("mrbgvqbk");

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

        {/* Formspree Form */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          {state.succeeded ? (
            <p className="text-center text-green-600">Thanks for reaching out!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text" 
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email" 
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text" 
                  name="subject"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 h-32"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
