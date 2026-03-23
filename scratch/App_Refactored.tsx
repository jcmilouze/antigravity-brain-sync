import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeatureCard from './components/FeatureCard';
import { Phone, Mail, GraduationCap, Sparkles, Trees, Scissors, ShoppingCart, Cpu } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      <Header />
      <Navigation />

      <main className="container mx-auto px-6 pb-20 pt-8">
        {/* HERO SECTION */}
        <HeroSection />

        {/* SOCIAL PROOF / RESULTS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <StatsSection />
          <TestimonialsSection />
        </div>

        <div className="mb-10 border-t border-slate-100 pt-10">
          <h2 className="text-3xl font-bold text-slate-900">Nos Filières & Formations</h2>
          <p className="text-slate-500 mt-2">Explorez nos 4 pôles d'excellence.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN BENTO GRID */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1: BOIS */}
                <FeatureCard 
                    title="Filière Bois"
                    description="De la conception à la réalisation. Maîtrisez le matériau noble par excellence dans nos ateliers équipés."
                    icon={Trees}
                    image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
                    tags={["BAC PRO TCB", "CAP Menuisier"]}
                />

                {/* 2: MAROQUINERIE */}
                <FeatureCard 
                    title="Maroquinerie"
                    description="L'excellence du geste. Apprenez à travailler les cuirs les plus précieux pour l'industrie du luxe."
                    icon={Scissors}
                    image="https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800"
                    tags={["BAC PRO Maroquinier", "CAP Maroquinier"]}
                />

                {/* 3: COMMERCE */}
                <FeatureCard 
                    title="Commerce"
                    description="Devenez expert en relation client et gestion de boutique dans un environnement dynamique."
                    icon={ShoppingCart}
                    image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800"
                    tags={["BAC PRO MCV", "CAP EPC"]}
                />

                {/* 4: DIGITAL */}
                <FeatureCard 
                    title="Digital & Marketing"
                    description="FCIL E-Commerce. Maîtrisez les outils de demain : SEO, Webdesign et stratégie de vente en ligne."
                    icon={Cpu}
                    image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800"
                    tags={["FCIL Web-Marketing", "BAC PRO Digital"]}
                />
            </div>

            {/* Synergy Bar */}
            <div className="mt-8 bg-slate-950 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-5 relative z-10">
                    <div className="p-3 bg-emerald-500 rounded-2xl rotate-3 transform group-hover:rotate-0 transition-transform">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h4 className="font-black text-white text-xl uppercase tracking-tighter">L'Écosystème Bort-Artense</h4>
                        <p className="text-slate-400 text-sm font-medium">Les filières travaillent ensemble : le bois construit, le cuir habille, le web vend.</p>
                    </div>
                </div>
                <button className="text-xs font-black text-white bg-emerald-600 px-6 py-4 rounded-xl hover:bg-emerald-500 transition-all uppercase tracking-widest relative z-10 shadow-lg shadow-emerald-900/40">
                    VOIR LES PROJETS COMMUNS
                </button>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
                <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up hidden md:block">
         <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 w-80">
             <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                 <span className="font-black text-slate-900 text-sm uppercase tracking-tighter">Nous contacter</span>
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
             </div>
             <div className="space-y-4 mb-6">
                 <a href="tel:0555960300" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-all text-sm group">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50"><Phone className="w-4 h-4" /></div>
                    <span className="font-mono font-bold">05 55 96 03 00</span>
                 </a>
                 <a href="mailto:ce.0190011k@ac-limoges.fr" className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-all text-sm group">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50"><Mail className="w-4 h-4" /></div>
                    <span className="truncate font-medium">ce.0190011k@ac-limoges.fr</span>
                 </a>
             </div>
             <button className="w-full bg-slate-900 hover:bg-black text-white text-xs font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl">
                <GraduationCap className="w-5 h-5" />
                IMMERSION COLLÉGIENS
             </button>
         </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 mt-20">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-16 mb-16 border-b border-white/5 pb-16">
                <div className="col-span-2">
                    <h2 className="text-3xl font-black mb-6 tracking-tighter">LP Bort-Artense</h2>
                    <p className="text-slate-500 text-base max-w-md leading-relaxed font-medium">
                        Une institution publique d'excellence dédiée à la réussite professionnelle et à l'épanouissement de chaque élève.
                    </p>
                </div>
                <div>
                    <h4 className="font-black mb-8 text-xs uppercase tracking-[0.2em] text-emerald-500">Navigation</h4>
                    <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-tight">
                        <li><a href="#" className="hover:text-white transition-colors">Formations</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Vie scolaire</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Espace Entreprises</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-black mb-8 text-xs uppercase tracking-[0.2em] text-emerald-500">Légal</h4>
                    <ul className="space-y-4 text-sm text-slate-400 font-bold uppercase tracking-tight">
                        <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Accessibilité</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-black uppercase tracking-widest">
                <p>© 2025 LP BORT-ARTENSE. ACADÉMIE DE LIMOGES.</p>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <span className="hover:text-slate-400 cursor-pointer">RÉGION NOUVELLE-AQUITAINE</span>
                    <span className="hover:text-slate-400 cursor-pointer">GRETA DU LIMOUSIN</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
