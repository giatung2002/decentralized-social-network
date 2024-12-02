'use client';

import dynamic from 'next/dynamic';

const MetaMaskLogin = dynamic(() => import('./MetaMaskLogin'), {
    ssr: false
});

export default function LoginPage() {
    return (
        <div>
            <MetaMaskLogin />
        </div>
    );
}