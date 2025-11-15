'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 shadow-lg">
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-3xl font-extrabold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-red-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          StreamDash
        </Link>
        <div className="flex gap-8 items-center">
          <Link 
            href="/" 
            className="text-gray-300 hover:text-white font-medium transition-all duration-200 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
