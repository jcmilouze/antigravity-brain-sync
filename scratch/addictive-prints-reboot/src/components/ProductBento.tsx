"use client";

import { motion } from "framer-motion";
import { MoveUpRight, ShieldCheck, Zap, Layers } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "LA CALE",
    subtitle: "Système de ponçage magnétique",
    price: "69,00 €",
    description: "Ergonomie maximale et changement de grain instantané.",
    size: "large", // 2x2 or 2x1
    image: "https://addictiveprints.fr/wp-content/uploads/2023/12/cale-scaled.jpg", // Placeholder URL from original site
  },
  {
    id: 2,
    title: "DUSTLOVER",
    subtitle: "Adaptateur 100mm",
    price: "49,00 €",
    description: "Aspiration cyclonique haute performance.",
    size: "small",
  },
  {
    id: 3,
    title: "SYSTAINER",
    subtitle: "Kit complet d'organisation",
    price: "89,00 €",
    description: "Compatible avec tous les coffrets standards.",
    size: "small",
  }
];

export default function ProductBento() {
  return (
    <section className="section-padding bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">// Selected_Hardware</span>
            <h2 className="text-5xl md:text-7xl">NOS SOLUTIONS <br /> DE PRÉCISION.</h2>
          </div>
          <p className="text-zinc-500 max-w-sm">
            Chaque pièce est optimisée pour la durabilité et le confort d&apos;utilisation prolongé en atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-full md:h-[800px]">
          {/* Card Large */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 glass rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-bold mb-2">{products[0].title}</h3>
                  <p className="text-zinc-400 font-mono text-sm">{products[0].subtitle}</p>
                </div>
                <div className="text-2xl font-bold text-accent">{products[0].price}</div>
              </div>
              <p className="mt-6 text-zinc-300 max-w-xs">{products[0].description}</p>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 opacity-20 group-hover:opacity-30 transition-opacity">
               {/* 3D Model would go here, using a placeholder gradient for now */}
               <div className="w-full h-full rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 flex justify-between items-end">
               <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors">
                 VOIR LES DÉTAILS <MoveUpRight size={16} />
               </button>
               <div className="flex gap-4 text-zinc-600">
                  <ShieldCheck size={20} />
                  <Zap size={20} />
                  <Layers size={20} />
               </div>
            </div>
          </motion.div>

          {/* Card Small 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{products[1].title}</h3>
                <div className="text-accent font-bold">{products[1].price}</div>
              </div>
              <p className="text-zinc-500 text-sm">{products[1].description}</p>
            </div>
            <button className="w-full py-3 border border-zinc-800 rounded-xl mt-8 hover:bg-white/5 transition-colors text-sm">
              COMMANDER
            </button>
          </motion.div>

          {/* Card Small 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass rounded-3xl p-8 flex flex-col justify-between border-accent/20"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{products[2].title}</h3>
                <div className="text-accent font-bold">{products[2].price}</div>
              </div>
              <p className="text-zinc-500 text-sm">{products[2].description}</p>
            </div>
            <button className="w-full py-3 bg-accent text-accent-foreground font-bold rounded-xl mt-8 hover:scale-105 transition-transform text-sm">
              AJOUTER AU PANIER
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
