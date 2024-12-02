'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/context/WalletContext'

// Define error types
interface MetaMaskError extends Error {
    code?: number;
    message: string;
}

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"/>
)

// MetaMask SVG Icon Component
const MetaMaskIcon = () => (
    <svg 
        className="w-5 h-5"
        viewBox="0 0 35 33" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z" 
            fill="#E17726" 
            stroke="#E17726" 
            strokeWidth="0.25" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        <path 
            d="M2.66296 1L15.6525 10.8511L13.3434 4.99099L2.66296 1Z" 
            fill="#E27625" 
            stroke="#E27625" 
            strokeWidth="0.25" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
)

export default function MetaMaskLogin() {
    const { isConnected, setIsConnected, account, setAccount } = useWallet()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (isConnected && account) {
            router.push('/')
        }
    }, [isConnected, account, router])

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                setIsLoading(true)
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setAccount(accounts[0])
                setIsConnected(true)
            } catch (err) {
                setError('An error occurred while connecting to MetaMask.')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        } else {
            setError('MetaMask is not installed.')
        }
    }

    if (!mounted) return null

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
            <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Connect Your Wallet
                </h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-md">
                        Loading...
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Connect with MetaMask
                    </button>
                )}
            </div>
        </div>
    )
}