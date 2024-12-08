import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">&copy; 2023 DecentraNet. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

