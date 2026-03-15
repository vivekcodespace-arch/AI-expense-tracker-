'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Close mobile nav when route changes
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/expenses', label: 'Expenses', icon: '💳' },
    { href: '/wallet', label: 'Wallet', icon: '💰' },
    { href: '/budget', label: 'Budget', icon: '📊' },
    { href: '/ai', label: 'AI Assistant', icon: '🤖' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            AI Expense Tracker
          </Link>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600 hover:scale-105'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-indigo-600 p-2"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white/90 border-b border-white/20 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;