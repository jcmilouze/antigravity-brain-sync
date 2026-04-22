"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5"
    >
      <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-accent-foreground font-black text-lg">
          A
        </div>
        ADDICTIVE PRINTS
      </Link>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="text-zinc-400 hover:text-zinc-50 transition-colors">ACCUEIL</Link>
        <Link href="/boutique" className="text-zinc-400 hover:text-zinc-50 transition-colors">BOUTIQUE</Link>
        <Link href="/about" className="text-zinc-400 hover:text-zinc-50 transition-colors">L&apos;HISTOIRE</Link>
        <Link href="/contact" className="text-zinc-400 hover:text-zinc-50 transition-colors">CONTACT</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
          <ShoppingBag size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
        <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
