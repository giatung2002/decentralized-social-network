'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { usePathname } from 'next/navigation';

export function Header() {
  const currentPath = usePathname();

  return (
    <header className="w-full bg-gray-800">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">DecentraNet</h1>
        <nav className="space-x-4">
          <Link href="/">
            <Button variant={currentPath === '/' ? 'solid' : 'outline'} className="text-white">Home</Button>
          </Link>
          <Link href="/features">
            <Button variant={currentPath === '/features' ? 'solid' : 'outline'} className="text-white">Features</Button>
          </Link>
          <Link href="/about">
            <Button variant={currentPath === '/about' ? 'solid' : 'outline'} className="text-white">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant={currentPath === '/contact' ? 'solid' : 'outline'} className="text-white">Contact</Button>
          </Link>
          <Button variant="outline" className="text-white">Log In</Button>
          <Button className="text-white">Sign Up</Button>
        </nav>
      </div>
    </header>
  );
}