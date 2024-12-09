'use client'

import React from 'react'
import '@/styles/Dropdown.css'
import Link from 'next/link';

export default function Dropdown() {
    const handleLogout = () => {
        // Clear user session from local storage or call logout from your auth service
        localStorage.removeItem('userToken');
        // Redirect user to the login page or home page
        window.location.href = '/login';
    }

    return (
        <div className="dropdown">
            <ul>
            <li><Link href="/profile">Profile</Link></li>
                <li>Post</li>
                <li>Messages</li>

                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    )
}