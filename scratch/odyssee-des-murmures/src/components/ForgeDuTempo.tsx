import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Drum, Home, RotateCcw, AlertCircle } from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";

const WORDS = [
  { text: "MA-MAN", syllables: [{ text: "MA", color: "bg-pink-100" }, { text: "MAN", color: "bg-pink-200" }] },
  { text: "BA-TEAU", syllables: [{ text: "BA", color: "bg-blue-100" }, { text: "TEAU", color: "bg-blue-200" }] },
  { text: "FO-RÊT", syllables: [{ text: "FO", color: "bg-emerald-100" }, { text: "RÊT", color: "bg-emerald-200" }] },
];

export function ForgeDuTempo({ onBack }: { onBack: () => void }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState(0);
  const [isStriking, setIsStriking] = useState(false);
  const { speak, error: speechError } = useSpeech();

  const currentWord = WORDS[currentWordIndex];
  const currentSyllable = currentWord.syllables[currentSyllableIndex];

  const handleDrumClick = () => {
    setIsStriking(true);
    setTimeout(() => setIsStriking(false), 150);

    // Prononcer la syllabe courante avec la voix magique !
    speak(currentSyllable.text);

    if (currentSyllableIndex < currentWord.syllables.length - 1) {
      setCurrentSyllableIndex(currentSyllableIndex + 1);
    } else {
      // Word finished!
      setTimeout(() => {
        if (currentWordIndex < WORDS.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setCurrentSyllableIndex(0);
        } else {
          // Loop back
          setCurrentWordIndex(0);
          setCurrentSyllableIndex(0);
        }
      }, 800);
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setCurrentSyllableIndex(0);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[60vh] py-8">
      {/* Header Controls */}
      <div className="w-full flex justify-between px-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white shadow-sm rounded-2xl text-dys-text hover:bg-dys-accent/10 transition-colors"
        >
          <Home size={24} />
        </button>
        
        <div className="bg-dys-accent/5 px-6 py-2 rounded-full border border-dys-accent/10">
          <span className="text-dys-accent font-bold uppercase tracking-wider text-sm">Niveau 1 : Les mots simples</span>
        </div>

        <button 
          onClick={resetGame}
          className="p-3 bg-white shadow-sm rounded-2xl text-dys-text hover:bg-dys-accent/10 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Syllables Display */}
      <div className="flex gap-4 mb-12">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentWordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-3"
          >
            {currentWord.syllables.map((syl, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === currentSyllableIndex ? 1.1 : 1,
                  opacity: i < currentSyllableIndex ? 0.5 : 1,
                  boxShadow: i === currentSyllableIndex ? "0 10px 25px -5px rgba(108, 92, 231, 0.3)" : "none"
                }}
                className={`text-4xl md:text-5xl font-bold px-8 py-6 rounded-3xl transition-all duration-300 ${syl.color} text-dys-text border-2 ${i === currentSyllableIndex ? 'border-dys-accent' : 'border-transparent'}`}
              >
                {syl.text}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <div className="mb-12 text-center max-w-md">
        <p className="text-dys-text/60 text-lg">Touche le tambour pour faire chanter chaque partie du mot !</p>
      </div>

      {/* Error Message */}
      {speechError && (
        <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-xl mb-4">
          <AlertCircle size={18} />
          <span className="text-sm font-medium">La voix magique est en cours de préparation...</span>
        </div>
      )}

      {/* The Drum */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isStriking ? 0.9 : 1,
            rotate: isStriking ? 5 : 0
          }}
          className="relative z-10"
        >
          <button
            onClick={handleDrumClick}
            className="w-48 h-48 md:w-56 md:h-56 bg-dys-accent rounded-full flex items-center justify-center text-white shadow-[0_20px_50px_rgba(108,92,231,0.4)] hover:shadow-[0_25px_60px_rgba(108,92,231,0.5)] transition-all duration-300 active:scale-90 border-8 border-white"
          >
            <Drum size={80} className="md:size-96" />
          </button>
        </motion.div>
        
        {/* Ripples animations */}
        <AnimatePresence>
          {isStriking && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dys-accent rounded-full -z-0"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
