import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import { ArrowRight, Sparkles, Phone, Mail, GraduationCap, Quote, Award, Briefcase, Users, CheckCircle, Home } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      <Header />
      <Navigation />

      <main className="container mx-auto px-6 pb-20 pt-8">
        
        {/* NEW HERO SECTION (StoryBrand + UX Optimized) */}
        <div className="relative bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl mb-12 flex flex-col lg:flex-row min-h-[500px]">
            
            {/* Zone 1: Text (40%) */}
            <div className="lg:w-5/12 p-8 md:p-12 flex flex-col justify-center relative z-20">
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                    Tu ne sais pas quel <span className="text-emerald-400">m├®tier</span> te correspond ?
                </h1>
                <p className="text-lg md:text-xl text-slate-200 font-medium mb-6 leading-relaxed">
                    Chez Bort-Artense, tu exp├®rimentes en vrai les m├®tiers avant de choisir.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-3 text-emerald-100/90 text-sm font-medium">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p>├Ç la fin, tu seras capable, confiant(e) et pr├¬t(e) pour le march├® du travail.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                         <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-3">
                            D├®couvre tes futurs m├®tiers
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 italic pl-1">(Visite gratuite + conseils personnalis├®s)</p>
                </div>
            </div>

            {/* Zone 2: Visual (60%) */}
            <div className="lg:w-7/12 relative h-64 lg:h-auto bg-slate-800">
                 <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1581092921461-eab624520c68?q=80&w=1200" 
                        alt="├ël├¿ve en situation r├®elle" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/* Gradient Overlay for smooth text transition */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f172a] via-[#0f172a]/50 to-transparent"></div>
                </div>
            </div>
        </div>

        {/* SOCIAL PROOF / RESULTS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
             {/* KPIs */}
             <div className="md:col-span-5 bg-slate-50 rounded-xl border border-slate-100 p-8 flex flex-col justify-center gap-8">
                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">Nos chiffres</h3>
                
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-lg"><Award className="w-8 h-8" /></div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">95%</div>
                        <div className="text-sm text-slate-600 font-medium">de r├®ussite au dipl├┤me</div>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg"><Home className="w-8 h-8" /></div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">85%</div>
                        <div className="text-sm text-slate-600 font-medium">d'├®l├¿ves internes (Corr├¿ze, Cantal, Puy-de-D├┤me)</div>
                    </div>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-700 rounded-lg"><Users className="w-8 h-8" /></div>
                    <div>
                        <div className="text-3xl font-black text-slate-900">2500+</div>
                        <div className="text-sm text-slate-600 font-medium">anciens ├®l├¿ves en activit├®</div>
                    </div>
                </div>
             </div>

             {/* Testimonials */}
             <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <Quote className="w-8 h-8 text-slate-200 mb-3 fill-current" />
                        <p className="text-slate-700 font-medium italic text-sm mb-4">"Avant j'├®tais perdu, ├á Bort-Artense j'ai d├®couvert ma passion pour le bois. Aujourd'hui je dirige ma propre ├®quipe."</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">TR</div>
                        <div className="text-xs">
                            <div className="font-bold text-slate-900">Thomas R.</div>
                            <div className="text-slate-500">Menuisier, Promo 2019</div>
                        </div>
                    </div>
                </div>

                 <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                     <div>
                        <Quote className="w-8 h-8 text-slate-200 mb-3 fill-current" />
                        <p className="text-slate-700 font-medium italic text-sm mb-4">"L'immersion en atelier m'a donn├® une confiance que je n'avais pas au coll├¿ge. Je me suis sentie capable."</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">LM</div>
                        <div className="text-xs">
                            <div className="font-bold text-slate-900">L├®a M.</div>
                            <div className="text-slate-500">Maroquinerie, Promo 2021</div>
                        </div>
                    </div>
                </div>

                 <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm md:col-span-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-600 text-white rounded-full"><Briefcase className="w-5 h-5" /></div>
                        <p className="text-blue-900 font-bold text-sm">Nos entreprises partenaires recrutent.</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
             </div>
        </div>

        <div className="mb-10 border-t border-slate-100 pt-10">
            <h2 className="text-3xl font-bold text-slate-900">Nos Fili├¿res & Formations</h2>
            <p className="text-slate-500 mt-2">Explorez nos 4 p├┤les d'excellence.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN BENTO GRID */}
          <div className="lg:col-span-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* BLOCK 1: BOIS (Pastel Mint) */}
                <div className="group relative min-h-[380px] bg-[#D1FAE5] rounded-xl p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 overflow-hidden">
                    {/* Background Image - Charpente/Ouvriers */}
                    <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800" 
                            alt="Charpente et Construction Bois" 
                            className="w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-opacity duration-700 mix-blend-multiply grayscale group-hover:grayscale-0"
                        />
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#065F46] mb-4">
                            Fili├¿re Bois <br/>
                            <span className="font-normal text-xl">Constructeur & Menuisier</span>
                        </h3>
                        <p className="text-[#064E3B] text-sm font-medium max-w-xs leading-relaxed opacity-80">
                            De la conception ├á la r├®alisation. Ma├«trisez le mat├®riau noble par excellence dans nos ateliers ├®quip├®s.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                        <ul className="space-y-2 mb-6">
                            <li className="text-[#065F46] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span> BAC PRO TCB
                            </li>
                            <li className="text-[#065F46] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span> CAP Menuisier
                            </li>
                        </ul>
                        <span className="inline-block font-bold text-[#059669] text-sm group-hover:underline">
                            D├®couvrir la fili├¿re
                        </span>
                    </div>
                </div>

                {/* BLOCK 2: MAROQUINERIE (Pastel Orange/Apricot) */}
                <div className="group relative min-h-[380px] bg-[#FFEDD5] rounded-xl p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800" 
                            alt="Atelier Maroquinerie" 
                            className="w-full h-full object-cover opacity-10 group-hover:opacity-25 transition-opacity duration-700 mix-blend-multiply grayscale group-hover:grayscale-0"
                        />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#9A3412] mb-4">
                            Maroquinerie <br/>
                            <span className="font-normal text-xl">Art & Luxe</span>
                        </h3>
                        <p className="text-[#7C2D12] text-sm font-medium max-w-xs leading-relaxed opacity-80">
                            L'excellence du geste. Apprenez ├á travailler les cuirs les plus pr├®cieux pour l'industrie du luxe.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto">
                         <ul className="space-y-2 mb-6">
                            <li className="text-[#9A3412] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span> BAC PRO Maroquinerie
                            </li>
                            <li className="text-[#9A3412] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span> CAP Maroquinerie
                            </li>
                        </ul>
                        <span className="inline-block font-bold text-[#EA580C] text-sm group-hover:underline">
                            Voir les cr├®ations
                        </span>
                    </div>
                </div>

                {/* BLOCK 3: COMMERCE (Pastel Rose) */}
                <div className="group relative min-h-[320px] bg-[#FFE4E6] rounded-xl p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 overflow-hidden">
                     {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800" 
                            alt="Commerce et Vente" 
                            className="w-full h-full object-cover opacity-10 group-hover:opacity-25 transition-opacity duration-700 mix-blend-multiply grayscale group-hover:grayscale-0"
                        />
                    </div>
                    
                    <div className="relative z-10">
                         <h3 className="text-2xl font-bold text-[#9F1239] mb-2">
                            Commerce <br/>
                            <span className="font-normal text-xl">& Relation Client</span>
                        </h3>
                    </div>
                    <div className="relative z-10 mt-4">
                         <ul className="space-y-2 mb-4">
                            <li className="text-[#9F1239] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]"></span> CAP EPC
                            </li>
                            <li className="text-[#9F1239] font-bold text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]"></span> BAC PRO MCV Option A et B
                            </li>
                        </ul>
                         <span className="inline-block font-bold text-[#E11D48] text-sm group-hover:underline">
                            Visiter la boutique
                        </span>
                    </div>
                </div>

                {/* BLOCK 4: DIGITAL (Pastel Blue) */}
                <div className="group relative min-h-[320px] bg-[#DBEAFE] rounded-xl p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                         <img 
                            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800" 
                            alt="Digital et Code" 
                            className="w-full h-full object-cover opacity-10 group-hover:opacity-25 transition-opacity duration-700 mix-blend-multiply grayscale group-hover:grayscale-0"
                        />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-[#1E40AF] mb-2">
                            Digital <br/>
                            <span className="font-normal text-xl">& Marketing</span>
                        </h3>
                    </div>
                    <div className="relative z-10 mt-4">
                         <p className="text-[#1E3A8A] text-sm font-medium mb-4 opacity-80">
                            FCIL E-Commerce. Devenez expert en strat├®gie digitale, SEO et webdesign.
                        </p>
                         <span className="inline-block font-bold text-[#2563EB] text-sm group-hover:underline">
                            Le programme FCIL
                        </span>
                    </div>
                </div>
            </div>

            {/* Synergy Bar (Ecosystem) */}
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-200 rounded-full">
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">L'├ëcosyst├¿me Bort-Artense</h4>
                        <p className="text-slate-500 text-xs">Les fili├¿res travaillent ensemble : le bois construit, le cuir habille, le web vend.</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-slate-900 border border-slate-300 px-4 py-2 rounded-lg hover:bg-white transition-colors">
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

      {/* Fixed Bottom Right Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up hidden md:block">
         <div className="bg-white border border-slate-200 shadow-2xl rounded-xl p-5 w-72">
             <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                 <span className="font-bold text-slate-900 text-sm">Nous contacter</span>
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             </div>
             <div className="space-y-3 mb-4">
                 <a href="tel:0555960300" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors text-sm">
                    <Phone className="w-4 h-4" />
                    <span className="font-mono font-bold">05 55 96 03 00</span>
                 </a>
                 <a href="mailto:ce.0190011k@ac-limoges.fr" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">ce.0190011k@ac-limoges.fr</span>
                 </a>
             </div>
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-200">
                <GraduationCap className="w-4 h-4" />
                IMMERSION COLL├ëGIENS
             </button>
         </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 mt-20">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
                <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Lyc├®e Professionnel Bort-Artense</h2>
                    <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                        Une institution publique d'excellence d├®di├®e ├á la r├®ussite professionnelle et ├á l'├®panouissement de chaque ├®l├¿ve.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Navigation</h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                        <li><a href="#" className="hover:text-white">Toutes les formations</a></li>
                        <li><a href="#" className="hover:text-white">Vie scolaire & Internat</a></li>
                        <li><a href="#" className="hover:text-white">Espace Entreprises</a></li>
                        <li><a href="#" className="hover:text-white">Contact & Acc├¿s</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">L├®gal</h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                        <li><a href="#" className="hover:text-white">Mentions L├®gales</a></li>
                        <li><a href="#" className="hover:text-white">Politique de confidentialit├®</a></li>
                        <li><a href="#" className="hover:text-white">Accessibilit├® : Partiellement conforme</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                <p>┬® 2025 LP Bort-Artense. Acad├®mie de Limoges.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <span>R├®gion Nouvelle-Aquitaine</span>
                    <span>Greta du Limousin</span>
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-300 border-2 border-slate-100 cursor-default">
                   ­ƒÄô Site con├ºu avec la participation des ├®tudiants de la FCIL Webmarketing
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
