'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/context/WalletContext'
import Dropdown from '@/components/Dropdown'

export function Header() {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isConnected, account, setIsConnected, setAccount } = useWallet()
    const router = useRouter()

    const handleDisconnect = () => {
        setIsConnected(false)
        setAccount(null)
        setIsDropdownOpen(false)
        router.push('/')
    }

    const truncateAddress = (address: string) => {
        if (!address) return ''
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    useEffect(() => {
        console.log('Header Render - isConnected:', isConnected, 'Account:', account)
    }, [isConnected, account])

    const handleToggleDropdown = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDropdownOpen(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

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
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={handleToggleDropdown}
                                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="h-2 w-2 bg-green-300 rounded-full"></span>
                                        <span>{account ? truncateAddress(account) : 'Connected'}</span>
                                    </div>
                                </button>
                                {isDropdownOpen && <Dropdown />}
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