"use client";

import { motion } from "framer-motion";
import { Cpu, Drill, Gauge, Recycle } from "lucide-react";

const features = [
  {
    title: "Impression 3D FDM",
    desc: "Optimisation des trajectoires pour une résistance mécanique maximale.",
    icon: <Cpu className="text-accent" />
  },
  {
    title: "Testé en Atelier",
    desc: "Chaque prototype subit 100+ heures de tests en conditions réelles.",
    icon: <Drill className="text-accent" />
  },
  {
    title: "Haute Précision",
    desc: "Tolérances de fabrication inférieures à 0.15mm pour un fit parfait.",
    icon: <Gauge className="text-accent" />
  },
  {
    title: "Matériaux Recyclés",
    desc: "Utilisation prioritaire de filaments biosourcés et recyclables.",
    icon: <Recycle className="text-accent" />
  }
];

export default function Features() {
  return (
    <section className="section-padding bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-800">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
