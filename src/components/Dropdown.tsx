'use client'

import React, { useState } from 'react'
import '@/styles/Dropdown.css'
import Link from 'next/link';
import { MessageSquare, User, FileText, Bot, LogOut } from 'lucide-react';
import ChatGPT from '@/app/components/ChatGPT';

export default function Dropdown() {
    const [showChatBot, setShowChatBot] = useState(false);

    return (
        <>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-xs text-gray-400">Wallet connected</div>
                
                <Link href="/profile" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                </Link>

                <Link href="/posts" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Posts
                </Link>

                <button 
                    onClick={() => setShowChatBot(!showChatBot)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                    <Bot className="w-4 h-4" />
                    AI Blockchain Chatbot
                </button>

                <button 
                    onClick={() => {
                        localStorage.removeItem('userToken');
                        window.location.href = '/login';
                    }}
                    className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center gap-2 w-full"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            {/* Render ChatGPT outside the dropdown */}
            {showChatBot && (
                <ChatGPT onClose={() => setShowChatBot(false)} />
            )}
        </>
    )
}