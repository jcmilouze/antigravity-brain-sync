import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { BenchmarkResult } from '../App'

interface BenchmarkProps {
  onComplete: (result: BenchmarkResult) => void
}

interface GpuStats {
  utilization: number;
  memoryUsed: number;
  memoryTotal: number;
  temperature: number;
}

const Benchmark = ({ onComplete }: BenchmarkProps) => {
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState(0)
  const [duration, setDuration] = useState(0)
  const [tps, setTps] = useState(0)
  const [ttft, setTtft] = useState<number | null>(null)
  const [modelSize, setModelSize] = useState<number>(30)
  const [gpuStats, setGpuStats] = useState<GpuStats | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const endpoint = "http://localhost:1234/v1/chat/completions"
  const gpuEndpoint = "http://localhost:3001/api/gpu"
  const abortControllerRef = useRef<AbortController | null>(null)
  const gpuIntervalRef = useRef<any>(null)

  useEffect(() => {
    const fetchGpu = async () => {
      try {
        const res = await axios.get(gpuEndpoint)
        setGpuStats(res.data)
      } catch (e) { }
    }
    fetchGpu()
    gpuIntervalRef.current = setInterval(fetchGpu, 2000)
    return () => clearInterval(gpuIntervalRef.current)
  }, [])

  const runBenchmark = async () => {
    setLoading(true)
    setError(null)
    setTokens(0)
    setDuration(0)
    setTps(0)
    setTtft(null)

    const startTime = performance.now()
    let tokenCount = 0
    let firstTokenTime: number | null = null
    
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          model: 'qwen3-coder-30b',
          messages: [{ role: 'user', content: 'Génère un rapport de 1000 mots sur la performance du traitement local des LLM.' }],
          temperature: 0.1,
          max_tokens: 1000,
          stream: true,
        }),
      })

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
      if (!response.body) throw new Error('Stream non supporté')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let modelUsed = 'LM Studio'

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim().startsWith('data: ')) {
            const jsonStr = line.replace('data: ', '').trim()
            if (jsonStr === '[DONE]') break

            try {
              const data = JSON.parse(jsonStr)
              const content = data.choices[0]?.delta?.content
              if (data.model) modelUsed = data.model
              
              if (content) {
                if (firstTokenTime === null) {
                  firstTokenTime = performance.now()
                  setTtft(firstTokenTime - startTime)
                }
                tokenCount++
                setTokens(tokenCount)
                const currentDuration = (performance.now() - startTime) / 1000
                setDuration(currentDuration)
                setTps(tokenCount / currentDuration)
              }
            } catch (e) { }
          }
        }
      }

      const finalDuration = (performance.now() - startTime) / 1000
      setDuration(finalDuration)
      const finalTps = tokenCount / finalDuration
      setTps(finalTps)

      onComplete({
        tps: finalTps,
        ttft: firstTokenTime ? firstTokenTime - startTime : null,
        modelName: modelUsed,
        modelSize: modelSize,
        gpuUtilization: gpuStats?.utilization || null,
        vramUsed: gpuStats?.memoryUsed || null
      })

    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Benchmark arrêté par l\'utilisateur.')
      } else {
        setError(err.message || 'Échec de connexion.')
      }
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }

  const stopBenchmark = () => abortControllerRef.current?.abort()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-400">
        <div>
          <label className="block mb-2 uppercase tracking-wide">Endpoint Serveur</label>
          <div className="p-3 bg-black/30 rounded-lg text-sky-400 border border-white/5 truncate">
            {endpoint}
          </div>
        </div>
        <div>
          <label className="block mb-2 uppercase tracking-wide">Poids du Modèle (Go)</label>
          <input 
            type="number" 
            value={modelSize} 
            onChange={(e) => setModelSize(parseFloat(e.target.value))}
            className="w-full p-3 bg-black/30 rounded-lg text-indigo-400 border border-white/5 focus:outline-none"
          />
        </div>
      </div>

      {gpuStats && (
        <div className="flex items-center justify-between p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
          <div className="flex flex-col z-10">
            <span className="text-[10px] uppercase text-indigo-300 font-bold tracking-widest">Charge RTX 4090</span>
            <span className="text-xl font-mono font-black">{gpuStats.utilization}%</span>
          </div>
          <div className="flex flex-col z-10">
            <span className="text-[10px] uppercase text-indigo-300 font-bold tracking-widest">VRAM Utilisée</span>
            <span className="text-xl font-mono font-black">{gpuStats.memoryUsed}Mo</span>
          </div>
          <div className="flex flex-col z-10">
            <span className="text-[10px] uppercase text-indigo-300 font-bold tracking-widest">Temperature</span>
            <span className="text-xl font-mono font-black text-rose-500">{gpuStats.temperature}°C</span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
             <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${gpuStats.utilization}%` }}></div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {!loading ? (
          <button onClick={runBenchmark} className="btn-premium flex-1 text-lg shadow-xl py-4">
            ⚡ Lancer le Benchmark
          </button>
        ) : (
          <button onClick={stopBenchmark} className="flex-1 px-6 py-4 rounded-xl font-semibold bg-red-500/20 text-red-100 border border-red-500/50 hover:bg-red-500/30 flex items-center justify-center gap-3 animate-pulse">
            Arrêter le Test
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-metric p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
          <span className="text-[10px] uppercase text-gray-500 block mb-1">Tokens</span>
          <span className="text-xl font-bold text-sky-400 font-mono">{tokens}</span>
        </div>
        <div className="glass-metric p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
          <span className="text-[10px] uppercase text-gray-500 block mb-1">Durée</span>
          <span className="text-xl font-bold text-indigo-400 font-mono">{duration.toFixed(2)}s</span>
        </div>
        <div className="glass-metric p-4 bg-white/5 border border-white/5 rounded-2xl text-center">
          <span className="text-[10px] uppercase text-gray-500 block mb-1">Latence (TTFT)</span>
          <span className="text-xl font-bold text-amber-400 font-mono">{ttft ? `${ttft.toFixed(0)}ms` : '--'}</span>
        </div>
        <div className="glass-metric p-4 bg-sky-400/10 border border-sky-400/20 rounded-2xl text-center ring-2 ring-sky-400/20 shadow-lg">
          <span className="text-[10px] uppercase text-sky-400 font-black block mb-1">TPS</span>
          <span className="text-3xl font-black text-white font-mono">{tps.toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default Benchmark
