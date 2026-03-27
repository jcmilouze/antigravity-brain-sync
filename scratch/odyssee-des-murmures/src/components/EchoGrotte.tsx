import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Home, Sparkles, AlertCircle } from "lucide-react";
import { useRecognition } from "../hooks/useRecognition";
import { useSpeech } from "../hooks/useSpeech";

const LEVEL_WORDS = ["CHAT", "SOLEIL", "AMI", "MAMAN", "LAPIN", "LUTIN"];

export function EchoGrotte({ onBack }: { onBack: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const { isListening, transcript, error: recError, startListening } = useRecognition();
  const { speak } = useSpeech();

  const targetWord = LEVEL_WORDS[wordIndex];

  // Logic to handle transcript matching
  useEffect(() => {
    if (transcript.toLowerCase().includes(targetWord.toLowerCase())) {
      handleSuccess();
    }
  }, [transcript, targetWord]);

  const handleSuccess = () => {
    if (success) return; // Prevention
    setSuccess(true);
    speak(`Bravo Loïs ! Tu as dit ${targetWord} !`);
    
    setTimeout(() => {
      setSuccess(false);
      setWordIndex((prev) => (prev + 1) % LEVEL_WORDS.length);
    }, 2500);
  };

  const handleMicClick = () => {
    if (!isListening) {
      startListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[60vh] py-8 text-dys-text">
       {/* Header */}
       <div className="w-full flex justify-between px-4 mb-4">
        <button 
          onClick={onBack}
          className="p-3 bg-white shadow-sm rounded-2xl text-dys-text hover:bg-dys-accent/10 transition-colors"
        >
          <Home size={24} />
        </button>
        
        <div className="bg-purple-50 px-6 py-2 rounded-full border border-purple-200">
          <span className="text-purple-600 font-bold uppercase tracking-wider text-sm">Niveau : Les mots magiques</span>
        </div>

        <div className="w-12 h-12" /> {/* Spacer */}
      </div>

      {/* Target Word Display */}
      <div className="text-center mb-8">
        <p className="text-dys-text/50 font-medium mb-2 uppercase tracking-widest text-sm">Dis le mot magique :</p>
        <motion.h2 
          key={targetWord}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-black text-dys-accent tracking-tighter"
        >
          {targetWord}
        </motion.h2>
      </div>

      {/* The Fox Companion / Listener UI */}
      <div className="relative mb-8 flex flex-col items-center">
        <div className="relative">
            {/* Visual Listening Waves */}
            <AnimatePresence>
                {isListening && (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.4, 1.1], opacity: [0.1, 0.3, 0.1] }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 bg-dys-accent rounded-full -z-0"
                    />
                )}
            </AnimatePresence>

            <motion.div 
                animate={isListening ? { y: [0, -5, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-dys-accent relative z-10"
            >
                {success ? (
                    <Sparkles size={60} className="text-orange-400" />
                ) : isListening ? (
                    <Mic size={60} className="text-dys-accent" />
                ) : (
                    <MicOff size={60} className="text-dys-text/20" />
                )}
            </motion.div>
        </div>

        {/* Current Transcript Feedback */}
        <div className="h-12 mt-6">
            <AnimatePresence>
                {transcript && (
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-medium text-dys-accent italic"
                    >
                        "{transcript}..."
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Control / Tutorial */}
      <div className="text-center flex flex-col items-center gap-6">
        {recError && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-xl">
                 <AlertCircle size={18} />
                <span className="text-sm font-medium">{recError}</span>
            </div>
        )}

        <button
          onClick={handleMicClick}
          disabled={isListening || success}
          className={`px-10 py-5 rounded-3xl font-bold text-xl flex items-center gap-3 transition-all ${
            isListening 
              ? 'bg-dys-accent/20 text-dys-accent cursor-default' 
              : success 
              ? 'bg-green-500 text-white' 
              : 'bg-dys-accent text-white shadow-lg active:scale-95'
          }`}
        >
          {isListening ? "Léo t'écoute..." : success ? "Magnifique !" : "Appuie pour parler"}
          {!isListening && !success && <Mic className="w-6 h-6" />}
        </button>
      </div>

      {/* Success Modal / Overlay */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dys-accent/20 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1.2, rotate: 0 }}
              className="bg-white p-12 rounded-[4rem] shadow-2xl flex flex-col items-center text-center border-8 border-orange-300"
            >
              <Sparkles className="text-orange-400 w-24 h-24 mb-6" />
              <h3 className="text-5xl font-black text-dys-text">PARFAIT !</h3>
              <p className="text-2xl mt-4 font-bold text-dys-text/70 uppercase tracking-widest">{targetWord}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
