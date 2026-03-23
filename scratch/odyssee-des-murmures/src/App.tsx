import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Music, Mic, Image as ImageIcon, ChevronRight, ArrowLeft } from "lucide-react";
import { EchoGrotte } from "./components/EchoGrotte";
import { ForgeDuTempo } from "./components/ForgeDuTempo";

export default function App() {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);

  const worlds = [
    {
      id: "rythme",
      title: "La Forge du Tempo",
      desc: "Tape en rythme pour créer de la musique !",
      icon: <Music className="w-8 h-8" />,
      color: "bg-blue-200 border-blue-400",
      accent: "text-blue-600",
    },
    {
      id: "echo",
      title: "L'Écho de la Grotte",
      desc: "Dis les mots magiques à ton compagnon.",
      icon: <Mic className="w-8 h-8" />,
      color: "bg-purple-200 border-purple-400",
      accent: "text-purple-600",
    },
    {
      id: "invocation",
      title: "L'Invocateur d'Images",
      desc: "Tes mots deviennent des dessins magiques.",
      icon: <ImageIcon className="w-8 h-8" />,
      color: "bg-emerald-200 border-emerald-400",
      accent: "text-emerald-600",
    },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!selectedWorld ? (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center w-full"
          >
            {/* Header */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-2xl shadow-sm border border-orange-100">
                <Sparkles className="text-orange-400 w-10 h-10" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dys-text mb-4">
                L'Odyssée <span className="text-dys-accent">des Murmures</span>
              </h1>
              <p className="text-lg md:text-xl text-dys-text/70 max-w-2xl mx-auto">
                Prêt pour ton aventure magique avec Léo le renard ? 
                Choisis ton portail pour commencer.
              </p>
            </motion.header>

            {/* World Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              {worlds.map((world, index) => (
                <motion.button
                  key={world.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedWorld(world.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center text-center p-8 rounded-[2rem] border-4 transition-all shadow-xl hover:shadow-2xl ${world.color} relative overflow-hidden group`}
                >
                  <div className={`p-4 rounded-full mb-6 bg-white/80 ${world.accent}`}>
                    {world.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{world.title}</h2>
                  <p className="text-black/60 font-medium mb-6 leading-relaxed">{world.desc}</p>
                  <div className={`inline-flex items-center gap-2 font-bold px-6 py-2 rounded-full bg-white/90 ${world.accent} mt-auto`}>
                    Explorer <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex flex-col items-center"
          >
            {selectedWorld === "rythme" ? (
              <ForgeDuTempo onBack={() => setSelectedWorld(null)} />
            ) : selectedWorld === "echo" ? (
              <EchoGrotte onBack={() => setSelectedWorld(null)} />
            ) : (
              <div className="text-center p-12 bg-white/80 rounded-[3rem] shadow-xl border-4 border-white">
                <h2 className="text-4xl font-bold text-dys-text mb-8">En construction...</h2>
                <p className="text-xl text-dys-text/60 mb-12">Le monde de {selectedWorld} n'est pas encore prêt ! Léo y travaille dur.</p>
                <button 
                  onClick={() => setSelectedWorld(null)}
                  className="flex items-center gap-2 px-8 py-4 bg-dys-accent text-white font-bold rounded-2xl hover:bg-dys-accent/90 transition-all shadow-lg"
                >
                  <ArrowLeft className="w-6 h-6" /> Retour au village
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Status */}
      <footer className="mt-24 text-center text-dys-text/20 font-medium pb-8">
        <p>Développé avec 💜 pour Loïs — Orchestration 100% Locale (Ollama)</p>
      </footer>
    </main>
  );
}
