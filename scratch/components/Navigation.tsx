import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, GraduationCap } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'BOIS', color: 'bg-amber-500' },
    { name: 'MAROQUINERIE', color: 'bg-rose-500' },
    { name: 'COMMERCE', color: 'bg-blue-500' },
    { name: 'DIGITAL', color: 'bg-emerald-500' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-b border-slate-100 py-3' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        
        {/* LOGO & NOM */}
        <div className="flex items-center gap-3">
            <div className={`p-2 bg-slate-950 text-white rounded-xl transition-transform ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                <GraduationCap className="w-6 h-6" />
            </div>
            <div>
                <span className="block text-sm font-black text-slate-900 tracking-tighter leading-none uppercase">LP Bort-Artense</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">Académie de Limoges</span>
            </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8 bg-slate-100/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-inner">
             {navLinks.map((link) => (
                <a key={link.name} href={`#${link.name.toLowerCase()}`} className="text-[11px] font-black text-slate-700 hover:text-slate-900 transition-colors tracking-widest flex items-center gap-2 group">
                   <span className={`w-1.5 h-1.5 rounded-full ${link.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                   {link.name}
                </a>
             ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
             <button className="hidden md:flex items-center gap-2 bg-emerald-600 text-white text-[11px] font-black px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                DOSSIER D'INSCRIPTION <ArrowRight className="w-4 h-4" />
             </button>
             
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 bg-slate-100 rounded-lg">
                {mobileMenuOpen ? <X /> : <Menu />}
             </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
              {navLinks.map((link) => (
                <a key={link.name} href="#" className="text-sm font-bold text-slate-900 flex justify-between items-center border-b border-slate-50 pb-4">
                   {link.name} <ArrowRight className="w-4 h-4 opacity-30" />
                </a>
              ))}
              <button className="w-full bg-slate-900 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest">
                  PORTES OUVERTES 2026
              </button>
          </div>
      )}
    </nav>
  );
};

export default Navigation;
