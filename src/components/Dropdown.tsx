'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dropdown = () => {
    const { account, logOut } = useWallet();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('Dropdown Render - Account:', account);
    }, [account]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!account) return null;

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logOut();
        router.push('/');
    };

    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button 
                onClick={toggleDropdown} 
                className="dropdown-toggle" 
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {truncateAddress(account)}
            </button>
            {isOpen && (
                <ul className="dropdown-menu" role="menu">
                    <li role="menuitem">
                        <Link href="/home">Home</Link>
                    </li>
                    <li role="menuitem">
                        <Link href="/profile">Profile</Link>
                    </li>
                    <li role="menuitem">
                        <Link href="/features">Features</Link>
                    </li>
                    <li role="menuitem">
                        <Link href="/notifications">Notifications</Link>
                    </li>
                    <li role="menuitem">
                        <Link href="/messages">Messages</Link>
                    </li>
                    {/* New "Post" Button */}
                    <li role="menuitem">
                        <Link href="/post">Post</Link>
                    </li>
                    <li className="logout-button" onClick={handleLogout} role="menuitem">
                        Log Out
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;