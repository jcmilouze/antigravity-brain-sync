import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Fingerprint, ShieldCheck, User, Lock } from "lucide-react";
import { useAuraSound } from "../hooks/useAuraSound";

/**
 * AURA CIRCLE — Biometric Authentication Portal
 * Uses simulated acoustics-based identification logic.
 */

const BiometricScanner = ({ onComplete }: { onComplete: () => void }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const { playScanSound, playSuccessSound } = useAuraSound();

  useEffect(() => {
    if (scanning) {
      playScanSound();
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            playSuccessSound();
            setTimeout(onComplete, 800);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scanning, onComplete, playScanSound, playSuccessSound]);

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Animated Rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: scanning ? [1, 1.4] : 1, 
              opacity: scanning ? [0.4, 0] : 0.2 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.6,
              ease: "easeOut" 
            }}
            className="absolute inset-0 border border-gold/40 rounded-full"
          />
        ))}

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScanning(true)}
          className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 cursor-pointer ${
            scanning ? "bg-gold shadow-[0_0_80px_rgba(212,175,55,0.4)]" : "bg-white/5 border border-white/10"
          }`}
        >
          <Fingerprint className={`w-12 h-12 transition-colors duration-700 ${scanning ? "text-black" : "text-gold"}`} />
        </motion.div>

        {/* Scan Line */}
        {scanning && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-gold shadow-[0_0_20px_#D4AF37] z-20 pointer-events-none"
          />
        )}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold tracking-widest uppercase mb-2">
          {scanning ? "ANALYSE ACOUSTIQUE..." : "INVITATION REQUISE"}
        </h3>
        <p className="text-white/40 text-xs tracking-widest uppercase">
          {scanning ? `${progress}% SCAN COMPLÉTÉ` : "PLACEZ VOTRE EMPREINTE POUR LA SIGNATURE"}
        </p>
      </div>
    </div>
  );
};

const MemberPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/95 backdrop-blur-3xl overflow-y-auto pt-20"
        >
          <motion.button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs tracking-widest"
          >
            <Lock className="w-3 h-3" /> FERMER
          </motion.button>

          <div className="max-w-4xl w-full px-4 text-center">
            {!authenticated ? (
              <BiometricScanner onComplete={() => setAuthenticated(true)} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-6">
                    <User className="w-10 h-10 text-black" />
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase">ACCÈS AUTORISÉ.</h2>
                  <p className="text-gold tracking-[10px] uppercase text-sm">CERCLE AURA — MEMBRE #0412</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="p-10 border border-white/5 bg-white/[0.02] rounded-[30px] flex flex-col justify-between">
                    <div>
                      <ShieldCheck className="w-8 h-8 text-gold mb-6" />
                      <h4 className="font-bold mb-2">GARANTIE OBSIDIAN</h4>
                      <p className="text-white/40 text-sm font-light">Accès exclusif au remplacement prioritaire et support conciergerie 24/7.</p>
                    </div>
                  </div>
                  <div className="p-10 border border-white/5 bg-white/[0.02] rounded-[30px] flex flex-col justify-between">
                    <div>
                      <Fingerprint className="w-8 h-8 text-gold mb-6" />
                      <h4 className="font-bold mb-2">SIGNATURE ACOUSTIQUE</h4>
                      <p className="text-white/40 text-sm font-light">Profil "Crystal Clear" actif sur vos appareils. Ajustement fréquentiel automatisé.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <MagneticButton variant="gold" size="lg">COMMANDER L'ÉDITION ONYX</MagneticButton>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { MemberPortal };
