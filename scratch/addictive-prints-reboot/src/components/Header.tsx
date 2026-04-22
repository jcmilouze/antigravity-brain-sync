'use client';

import { useCartStore, useUIStore } from '@/lib/store';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const cartItems = useCartStore(state => state.items);
  const toggleCart = useUIStore(state => state.toggleCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Catalogue', href: '#collections' },
    { label: 'À Propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A2E]/95 backdrop-blur-sm border-b border-[rgba(124,58,237,0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] rounded-lg flex items-center justify-center text-[#1A1A2E] font-bold">
            AP
          </div>
          <span className="hidden sm:inline text-[#00D4FF]">Addictive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A0A0B0] hover:text-[#00D4FF] transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleCart()}
            className="relative p-2 text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] rounded-lg transition-colors"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#FF006E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0F0F1E] border-t border-[rgba(124,58,237,0.2)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A0A0B0] hover:text-[#00D4FF] transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
