'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface WalletContextProps {
    isConnected: boolean
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
    account: string | null
    setAccount: React.Dispatch<React.SetStateAction<string | null>>
    logOut: () => void
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState(false)
    const [account, setAccount] = useState<string | null>(null)

    const logOut = () => {
        setIsConnected(false)
        setAccount(null)
        // Remove listeners if any
        if (window.ethereum && window.ethereum.removeAllListeners) {
            window.ethereum.removeAllListeners('accountsChanged')
        }
    }

    return (
        <WalletContext.Provider value={{ isConnected, setIsConnected, account, setAccount, logOut }}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider')
    }
    return context
}