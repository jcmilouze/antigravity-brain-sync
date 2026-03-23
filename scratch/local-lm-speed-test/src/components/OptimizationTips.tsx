import { BenchmarkResult } from '../App'

interface OptimizationTipsProps {
  result: BenchmarkResult | null;
}

const OptimizationTips = ({ result }: OptimizationTipsProps) => {
  const getDynamicAdvice = () => {
    const advice = [];

    if (!result) {
       return [
         { title: "🚀 GPU Offload", content: "Assure-toi que 'GPU Offload' est au maximum. Le moindre débordement sur le CPU casse les performances." },
         { title: "💎 Le Sweet Spot : Q4_K_M", content: "C'est l'équilibre parfait : perte de qualité invisible mais TPS bien plus élevé que Q6/Q8." },
         { title: "⚡ Flash Attention", content: "Active-le dans les réglages pour réduire l'usage VRAM et accélérer le traitement du prompt." }
       ];
    }

    // CAS 1 : TPS trop bas par rapport au hardware
    if (result.tps < 10) {
      advice.push({
        title: "🚨 ALERTE CPU DÉTECTÉE",
        content: `Ton score de ${result.tps.toFixed(2)} t/s est trop bas pour une 4090. Vérifie que TOUTES les couches sont déchargées sur le GPU.`,
        urgent: true
      });
    }

    // CAS 2 : Latence élevée
    if (result.ttft && result.ttft > 2000) {
      advice.push({
        title: "🕒 LATENCE ÉLEVÉE (TTFT)",
        content: `Ton temps de réponse initial (${result.ttft.toFixed(0)}ms) est lent. Active Flash Attention ou réduis la fenêtre de contexte.`,
        urgent: true
      });
    }

    // CAS 3 : Performance élevée
    if (result.tps > 40) {
       advice.push({
         title: "🎖️ PERFORMANCE ÉLITE",
         content: "Tu es dans la zone optimale. Tu pourrais tester une quantification Q5_K_M pour gagner en précision sans perdre en fluidité.",
         positive: true
       });
    }

    // CAS 4 : Analyse d'efficience
    const efficiency = result.tps / result.modelSize;
    if (efficiency < 1.0) {
       advice.push({
         title: "📉 SOUS-EFFICIENCE",
         content: "Ton score tokens/Go est faible. Utilise bien le backend CUDA au lieu de Vulkan pour maximiser le débit sur NVIDIA.",
       });
    }

    // Conseils standards en complément
    if (advice.length < 3) {
      advice.push({ title: "📏 Fenêtre de Contexte", content: "Limiter la taille du contexte (Context Window) libère de la VRAM pour des modèles plus larges." });
      advice.push({ title: "🪟 Mode GPU Windows", content: "Active 'Hardware-accelerated GPU scheduling' dans les réglages Windows pour réduire la latence." });
    }

    return advice;
  };

  const currentAdvice = getDynamicAdvice();

  return (
    <div className="glass-card p-10 rounded-3xl mt-12 w-full max-w-6xl animate-in fade-in duration-1000">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <span className="text-amber-400">💡</span> Conseiller Performance
        </h2>
        {result && (
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Analyse basée sur : {result.modelName}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentAdvice.map((tip: any, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              tip.urgent ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
              tip.positive ? 'bg-emerald-500/10 border-emerald-500/30' : 
              'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <h3 className={`text-lg font-bold mb-3 ${
              tip.urgent ? 'text-red-400' : 
              tip.positive ? 'text-emerald-400' : 
              'text-sky-300'
            }`}>
              {tip.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">{tip.content}</p>
          </div>
        ))}
      </div>
      
      {result && (
         <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
              Vérification matérielle effectuée en temps réel
            </p>
         </div>
      )}
    </div>
  );
};

export default OptimizationTips;
