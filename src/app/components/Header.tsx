'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/context/WalletContext'
import Dropdown from '@/components/Dropdown'

export function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isConnected, account, setIsConnected, setAccount } = useWallet()
    const router = useRouter()

    const handleDisconnect = () => {
        // Clear wallet state
        setIsConnected(false)
        setAccount(null)
        // Close dropdown
        setIsDropdownOpen(false)
        // Optionally redirect to home
        router.push('/')
    }

    // Function to truncate ethereum address
    const truncateAddress = (address: string) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    useEffect(() => {
        console.log('Header Render - isConnected:', isConnected, 'Account:', account)
    }, [isConnected, account])

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-white text-2xl font-bold">
                            DecentraNet
                        </Link>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            Home
                        </Link>
                        <Link href="/features" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            Features
                        </Link>
                        <Link href="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            About
                        </Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            Contact
                        </Link>
                        
                        {isConnected ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="h-2 w-2 bg-green-300 rounded-full"></span>
                                        <span>{account ? truncateAddress(account) : 'Connected'}</span>
                                    </div>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu">
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Profile
                                            </Link>
                                            <Link href="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Notifications
                                            </Link>
                                            <Link href="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Messages
                                            </Link>
                                            <button
                                                onClick={handleDisconnect}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => router.push('/login')}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}