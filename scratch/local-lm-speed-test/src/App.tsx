import { useState, useEffect } from 'react'
import Benchmark from './components/Benchmark'
import ReferenceChart from './components/ReferenceChart'
import OptimizationTips from './components/OptimizationTips'
import BenchmarkHistory from './components/BenchmarkHistory'

export interface BenchmarkResult {
  tps: number;
  ttft: number | null;
  modelName: string;
  modelSize: number;
  gpuUtilization: number | null;
  vramUsed: number | null;
  timestamp?: string; // Ajouté pour l'historique
}

function App() {
  const [lastResult, setLastResult] = useState<BenchmarkResult | null>(null)
  const [history, setHistory] = useState<BenchmarkResult[]>([])

  // Charger l'historique au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('benchmark_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        console.error("Erreur lecture historique", e)
      }
    }
  }, [])

  // Sauvegarder l'historique dès qu'il change
  useEffect(() => {
    localStorage.setItem('benchmark_history', JSON.stringify(history))
  }, [history])

  const onBenchmarkComplete = (result: BenchmarkResult) => {
    const freshResult = { ...result, timestamp: new Date().toISOString() }
    setLastResult(freshResult)
    setHistory(prev => [...prev, freshResult])
  }

  const clearHistory = () => {
    if (window.confirm("Effacer tout l'historique ?")) {
      setHistory([])
      localStorage.removeItem('benchmark_history')
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-[#0f172a] text-white">
      <header className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
          Édition RTX 4090
        </div>
        <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-400 to-sky-300 animate-pulse-slow">
          Audit de Vitesse LM Studio
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Analyseur Dynamique de Performance Locale. 
          Mesure tes performances face aux géants du Cloud.
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="glass-card p-10 rounded-3xl animate-in zoom-in-95 duration-700">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-sky-500 rounded-full shadow-[0_0_15px_#0ea5e9]"></span>
            Testeur de Performance
          </h2>
          <Benchmark onComplete={onBenchmarkComplete} />
        </div>

        <div className="glass-card p-10 rounded-3xl animate-in zoom-in-95 duration-700 delay-100">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]"></span>
            Classement de Vitesse (TPS)
          </h2>
          <ReferenceChart 
            lmTps={lastResult?.tps || null} 
            modelName={lastResult?.modelName || 'LLM Local'} 
          />
        </div>
      </main>

      <OptimizationTips result={lastResult} />

      <BenchmarkHistory 
        history={history} 
        onClear={clearHistory} 
      />

      <footer className="mt-20 text-gray-700 text-[10px] uppercase tracking-[0.4em] font-bold text-center">
        Propulsé par Antigravity OS • IA Locale Haute Performance
      </footer>
    </div>
  )
}

export default App
