import { useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MagneticButton } from "./components/MagneticButton";
import { CursorLight } from "./components/CursorLight";
import { MemberPortal } from "./components/MemberPortal";

import { Aura3DConfig } from "./components/Aura3DConfig";

const App = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState<"onyx" | "gold" | "titanium">("onyx");
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.5
  });

  // Perspective and Blur for Obsidian Section
  const obsidianBlur = useTransform(smoothProgress, [0.3, 0.45, 0.55], ["0px", "20px", "0px"]);
  const obsidianScale = useTransform(smoothProgress, [0.3, 0.5], [0.8, 1.1]);

  return (
    <div className="relative min-h-screen bg-bg text-white overflow-x-hidden selection:bg-gold selection:text-black">
      <CursorLight />
      <MemberPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-[100] px-10 py-8 flex justify-between items-center bg-transparent backdrop-blur-sm">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-[0.3em] uppercase"
        >
          AURA
        </motion.h1>
        
        <div className="flex items-center gap-12">
          <a href="#technology" className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-all uppercase">Technologie</a>
          <MagneticButton 
            variant="gold" 
            size="sm"
            onClick={() => setIsPortalOpen(true)}
          >
            CERCLE AURA
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-at-c from-gold/5 to-transparent opacity-30" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <h2 className="text-[clamp(4rem,15vw,12rem)] font-black leading-none tracking-tighter uppercase mb-6">
            AURA <span className="text-white/10">PRO MAX</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10 decoration-gold decoration-2 px-6">
            L'excellence acoustique transcendée par le processeur <span className="text-gold font-bold">Obsidian H2</span>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton variant="primary">Précommander</MagneticButton>
            <MagneticButton variant="outline">En savoir plus</MagneticButton>
          </div>
        </motion.div>

        {/* Floating Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-[-10%] z-20 pointer-events-none w-full max-w-4xl px-10"
        >
           <img 
            src="assets/hero.png" 
            alt="Aura Pro Max" 
            className="w-full h-auto drop-shadow-[0_0_100px_rgba(212,175,55,0.1)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000";
            }}
          />
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section id="technology" className="relative py-40 px-6 md:px-20 z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Spatial Audio V4", desc: "Immersion sonore en 4D calculée en temps réel par notre processeur hybride Obsidian.", icon: "🎧" },
            { title: "Absolu Silence", desc: "Réduction de bruit active atteignant -48dB. Le reste du monde n'existe plus.", icon: "🛡️" },
            { title: "Titanium Audio", desc: "Diaphragmes en titane grade 5 pour une précision chirurgicale sur tout le spectre.", icon: "⚙️" },
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group p-10 border border-white/5 bg-white/[0.02] rounded-[40px] hover:bg-white/[0.04] transition-all"
            >
              <div className="text-3xl mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{f.title}</h3>
              <p className="text-white/40 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Obsidian Scrollytelling Section */}
      <section className="relative h-[200vh] py-20 bg-black overflow-hidden">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ 
              filter: `blur(${obsidianBlur})`,
              scale: obsidianScale,
            }}
            className="relative flex flex-col md:flex-row items-center gap-20 px-10"
          >
            <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
              <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                OBSIDIAN H2
              </h2>
              <p className="text-xl md:text-2xl text-white/40 max-w-lg font-light uppercase tracking-widest">
                Le cerveau de l'exceptionnel. Un processeur gravé en 3nm dédié exclusivement à la pureté acoustique.
              </p>
            </div>
            
            <div className="relative w-80 h-80 md:w-[600px] md:h-[600px]">
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-[100px] animate-pulse" />
              <img 
                src="assets/chip.png" 
                alt="Obsidian Chip"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3D Configurator Section */}
      <section className="relative min-h-screen py-40 bg-bg/50 backdrop-blur-3xl overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center h-full">
          <div className="order-2 lg:order-1 space-y-12">
            <div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">PERSONNALISER</h2>
              <p className="text-white/40 max-w-sm font-light uppercase tracking-widest leading-loose">
                Adaptez votre signature matérielle. Chaque alliage offre une résonance unique.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { id: "onyx", label: "Midnight Onyx", color: "bg-[#0a0a0a]", desc: "Absorption sonore maximale." },
                { id: "gold", label: "24K Gold Plated", color: "bg-[#D4AF37]", desc: "Brillance acoustique cristalline." },
                { id: "titanium", label: "Aerospace Titanium", color: "bg-[#888888]", desc: "Légèreté et rigidité absolue." },
              ].map((m) => (
                <button 
                  key={m.id}
                  onClick={() => setActiveMaterial(m.id as any)}
                  className={`group flex items-center gap-6 p-6 rounded-[30px] border transition-all duration-500 text-left ${
                    activeMaterial === m.id ? "bg-white/5 border-gold/40" : "bg-transparent border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full shadow-lg ${m.color}`} />
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-widest">{m.label}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-10">
              <MagneticButton variant="gold" size="lg">VALIDER LA CONFIGURATION</MagneticButton>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[800px] cursor-grab active:cursor-grabbing">
             <div className="absolute inset-0 z-0 bg-radial-at-c from-gold/10 to-transparent opacity-20 pointer-events-none" />
             <Aura3DConfig currentMaterial={activeMaterial} />
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-white/20 tracking-[1em] uppercase">
                DRAIN TO ROTATE • 360° EXPERIENCE
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-white/10 text-xs tracking-[1em] uppercase mb-8">AURA © 2026 — L'EXCELLENCE SANS COMPROMIS</p>
        <div className="flex justify-center gap-12 text-white/40 text-[10px] tracking-widest uppercase font-bold">
          <a href="#" className="hover:text-gold transition-colors">Politique de confidentialité</a>
          <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-gold transition-colors">Presse</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
