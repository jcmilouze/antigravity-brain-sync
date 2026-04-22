'use client';

import { useCartStore, useUIStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const items = useCartStore(state => state.items);
  const { isCartOpen, toggleCart } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Catalogue', href: '#collections' },
    { label: 'À Propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface-container border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-on-surface">ADDICTIVE PRINTS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => toggleCart()}
            className="relative p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Shopping cart"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-on-surface text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className="material-symbols-outlined text-2xl">close</span>
            ) : (
              <span className="material-symbols-outlined text-2xl">menu</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-surface-container-high border-t border-outline-variant px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-on-surface transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}
