import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Activity, BookOpen, Terminal, Globe, 
  Database, LayoutDashboard, Settings, ChevronRight,
  TrendingUp, HardDrive, ShieldCheck, AlertTriangle, ArrowUpRight,
  Target, Rocket, Info, Search, Loader2, Sparkles
} from 'lucide-react';
import { useHardware } from './hooks/useHardware';
import { useLLMWatch } from './hooks/useLLMWatch';
import { getRecommendations, getUpgradePath } from './logic/advisor';
import { runOrchestratedTask } from './logic/orchestrator';
import type { RecommendedModel } from './logic/advisor';
import './index.css';

// --- UI Atoms en Français ---

const SectionTitle = ({ children, subtitle }: { children: string; subtitle?: string }) => (
  <div className="mb-10">
    <h2 className="text-4xl font-extrabold text-white tracking-widest glow-text-white leading-none uppercase">{children}</h2>
    {subtitle && <p className="text-slate-500 mt-3 font-medium text-[10px] tracking-[0.4em] uppercase">{subtitle}</p>}
  </div>
);

const BentoCard = ({ children, title, icon: Icon, className = "", delay = 0, hoverGlow = true }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`glass-pro p-10 rounded-[2.5rem] overflow-hidden relative group border border-white/5 ${hoverGlow ? 'glass-hover' : ''} ${className}`}
  >
    <div className="flex items-center justify-between mb-10 opacity-40 group-hover:opacity-100 transition-all duration-500">
      <div className="flex items-center gap-5">
        <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500">
          <Icon size={22} className="text-white transform group-hover:rotate-12 group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="font-black text-white tracking-[0.4em] uppercase text-[10px]">{title}</h3>
      </div>
      <div className="w-2 h-2 rounded-full bg-slate-800 transition-colors group-hover:bg-white" />
    </div>
    {children}
  </motion.div>
);

// --- Main App ---

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function App() {
  const { hardware, loading: hwLoading } = useHardware();
  const { feed: watchFeed } = useLLMWatch();
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedModel[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // States
  const [taskInput, setTaskInput] = useState('');
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [orchestrationResult, setOrchestrationResult] = useState<any>(null);

  const handleOrchestration = async () => {
    if (!taskInput) return;
    setIsOrchestrating(true);
    setOrchestrationResult(null);
    try {
      const res = await runOrchestratedTask(taskInput);
      setOrchestrationResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsOrchestrating(false);
    }
  };

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const { data } = await axios.get('http://localhost:11434/api/tags');
        setOllamaModels(data.models || []);
      } catch (e) { console.warn('Ollama API non disponible.'); }
    };
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/history');
        setHistory(data);
      } catch (e) { console.warn('History API non disponible.'); }
    };

    fetchLocal();
    fetchHistory();
    const timer = setInterval(() => {
      fetchLocal();
      fetchHistory();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hardware) {
      setRecommendations(getRecommendations(hardware.vram_total));
    }
  }, [hardware]);

  if (hwLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-black gap-6 font-body">
       <div className="relative">
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="border border-white/10 border-t-white rounded-full w-24 h-24" />
         <Zap className="absolute inset-0 m-auto text-white animate-pulse" size={24} />
       </div>
       <div className="text-[10px] tracking-[0.5em] font-black text-slate-500 uppercase">Synchronisation Cognitive...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-[#f8fafc] selection:bg-white selection:text-black font-body">
      
      {/* Sidebar Flottante */}
      <aside className="fixed left-6 top-6 bottom-6 w-80 glass-pro z-50 rounded-[3rem] flex flex-col p-10 border border-white/10 shadow-[40px_0_100px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-5 mb-16 px-2">
          <div className="w-14 h-14 rounded-3xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            <Target className="text-black" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-[0.4em] leading-none uppercase">Cerveau</h1>
            <span className="text-[9px] font-black tracking-[0.5em] text-slate-600 uppercase">Watch v4.0</span>
          </div>
        </div>

        <nav className="flex-1 space-y-5">
          {[
            { id: 'dashboard', label: 'TABLEAU DE BORD', icon: LayoutDashboard },
            { id: 'orchestrator', label: 'ORCHESTRATEUR ACTIV', icon: Zap },
            { id: 'advisor', label: 'CONSEIL STRATÉGIQUE', icon: Cpu },
            { id: 'watch', label: 'VEILLE LLM', icon: Globe },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-400 group relative ${activeTab === item.id ? 'bg-white text-black shadow-glow-white border border-white/30' : 'hover:bg-white/5 hover:text-white text-slate-500'}`}
            >
              <item.icon size={22} className={activeTab === item.id ? 'text-black' : 'group-hover:text-white group-hover:scale-110 transition-transform'} />
              <span className="font-black text-[10px] tracking-[0.2em]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5 space-y-8">
          <div className="bg-white/[0.02] p-6 rounded-[2.5rem] border border-white/10 text-center">
             <div className="flex items-center justify-center gap-3 mb-2">
               <div className="w-1.5 h-1.5 rounded-full bg-white shadow-glow-white animate-pulse" />
               <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">RTX 4090 ONLINE</span>
             </div>
             <span className="text-[9px] font-mono text-slate-600 font-bold uppercase tracking-widest leading-none">Ollama Local Active</span>
          </div>
        </div>
      </aside>

      {/* Zone Principale */}
      <main className="ml-[25rem] flex-1 p-16 max-w-[1700px]">
        
        <header className="flex justify-between items-end mb-24 px-4 relative">
          <div>
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-white/20" />
               <span className="text-[10px] font-black text-white uppercase tracking-[0.6em]">Opérateur : Mimilouze</span>
            </div>
            <h2 className="text-6xl font-black text-white tracking-widest uppercase glow-text-white leading-tight">Orchestrateur Local</h2>
          </div>
          <div className="flex gap-6 pb-4">
             <div className="glass px-8 py-4 rounded-[1.5rem] border border-white/10 text-[9px] font-black tracking-[0.4em] uppercase flex items-center gap-4 text-white hover:bg-white/5">
               <Cpu size={14} /> 24GB VRAM
             </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-12 gap-12">
              <BentoCard title="Historique Cognitif" icon={Activity} className="col-span-12 lg:col-span-8 h-[520px]">
                 <div className="h-[320px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={history}>
                          <defs>
                             <linearGradient id="colorVram" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis 
                            dataKey="timestamp" 
                            stroke="rgba(255,255,255,0.3)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="rgba(255,255,255,0.3)" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={(val) => `${Math.round(val / 1024)}G`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', fontSize: '10px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="vram_used" 
                            stroke="#ffffff" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorVram)" 
                            animationDuration={1500}
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex gap-10 mt-10 overflow-x-auto pb-4 no-scrollbar">
                    {history[history.length - 1]?.models.map((m: any, i: number) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl whitespace-nowrap group">
                         <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-glow-emerald" />
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">{m.name}</span>
                         <span className="text-[9px] text-slate-500 font-bold">{m.processor}</span>
                      </div>
                    ))}
                    {(!history[history.length - 1]?.models.length) && (
                      <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">Aucun modèle chargé en VRAM</div>
                    )}
                 </div>
              </BentoCard>

              <BentoCard title="VRAM Mobile" icon={Zap} className="col-span-12 lg:col-span-4 h-[520px]">
                 <div className="flex flex-col items-center justify-center h-full gap-10 text-center">
                    <div className="text-8xl font-black text-white glow-text-white">{Math.round((hardware?.vram_used || 0) / (hardware?.vram_total || 24576) * 100)}%</div>
                    <div>
                       <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Charge Totale</div>
                       <div className="text-xl font-black text-white">{Math.round(hardware?.vram_used || 0)} MB / {hardware?.vram_total || 24576} MB</div>
                    </div>
                 </div>
              </BentoCard>

              <div className="col-span-12 lg:col-span-7 space-y-12">
                 <BentoCard title="Opportunités Directes" icon={Target}>
                    <div className="space-y-6">
                       {recommendations.slice(0, 3).map((rec, idx) => (
                         <div key={rec.tag} className="flex items-center gap-8 p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/40 hover:bg-white/[0.04] transition-all cursor-pointer group/item">
                            <div className="w-14 h-14 rounded-2xl bg-black border border-white/20 flex items-center justify-center font-black text-xl text-white group-hover/item:bg-white group-hover/item:text-black transition-all">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                               <h4 className="text-white font-black tracking-tighter text-xl uppercase mb-1">{rec.name}</h4>
                               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">« {rec.whyThisOver} »</p>
                            </div>
                            <ArrowUpRight className="text-slate-800 group-hover/item:text-white" />
                         </div>
                       ))}
                    </div>
                 </BentoCard>
                 <div className="p-8 rounded-[2.5rem] glass-pro border border-white/10 flex items-center justify-between group">
                    <div>
                       <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Statut Orchestration</div>
                       <div className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">Système Prêt</div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                       <div className="w-3 h-3 rounded-full bg-white shadow-glow-white" />
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orchestrator' && (
            <motion.div key="orch" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto">
               <SectionTitle subtitle="Pilotage Actif de l'Infrastructure LLM Local">Cerveau d'Orchestration</SectionTitle>
               
               <div className="space-y-12">
                  <div className="glass-pro p-14 rounded-[4rem] border border-white/15 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000">
                        <Zap size={200} className="text-white" />
                     </div>
                     <div className="flex items-center gap-6 mb-10">
                        <div className="px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] rounded-full">Mode Actif</div>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.8em]">Input Requis</span>
                     </div>
                     
                     <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-8">Quelle mission pour Mimilouze ?</h3>
                     <div className="relative mb-10">
                        <textarea 
                           className="w-full bg-black/40 border border-white/10 rounded-[2.5rem] p-10 text-2xl font-light text-white placeholder:text-slate-800 focus:border-white/40 focus:outline-none transition-all h-64 selection:bg-white selection:text-black"
                           placeholder="Ex: Écris un script PyTorch optimisé pour la 4090..."
                           value={taskInput}
                           onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <div className="absolute bottom-6 right-6 flex gap-4">
                           <button 
                             onClick={handleOrchestration}
                             disabled={isOrchestrating || !taskInput}
                             className={`flex items-center gap-4 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] transition-all ${isOrchestrating ? 'bg-slate-800 text-slate-500' : 'bg-white text-black hover:bg-slate-200 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]'}`}
                           >
                              {isOrchestrating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                              {isOrchestrating ? 'Orchestration...' : 'Lancer le calcul'}
                           </button>
                        </div>
                     </div>
                  </div>

                  <AnimatePresence>
                     {orchestrationResult && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        >
                           <div className="p-12 rounded-[3.5rem] glass-pro border border-white/20">
                              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-6">Classification Cerveau</div>
                              <div className="flex items-center gap-6 mb-8">
                                 <div className="w-16 h-16 rounded-[1.5rem] bg-white text-black flex items-center justify-center shadow-glow-white"><Target size={32} /></div>
                                 <div>
                                    <h4 className="text-4xl font-black text-white tracking-tighter leading-none">{orchestrationResult.category}</h4>
                                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Confiance : {Math.round(orchestrationResult.confidence * 100)}%</span>
                                 </div>
                              </div>
                              <p className="text-lg text-slate-400 font-light leading-relaxed italic">« {orchestrationResult.reason} »</p>
                           </div>

                           <div className="p-12 rounded-[3.5rem] glass-pro border border-white/20 bg-white/[0.02]">
                              <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-6">Status Hardware</div>
                              <div className="flex items-center gap-6 mb-10">
                                 <div className="w-16 h-16 rounded-[1.5rem] border border-white/10 flex items-center justify-center group"><Loader2 size={32} className={`text-white ${orchestrationResult.success ? '' : 'animate-spin'}`} /></div>
                                 <div>
                                    <h4 className="text-4xl font-black text-white tracking-tighter leading-none">{orchestrationResult.recommendedModel}</h4>
                                    <span className="text-[10px] text-white font-bold uppercase tracking-widest uppercase">{orchestrationResult.success ? 'Chargé en VRAM' : 'Opération en cours'}</span>
                                 </div>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                 <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 1.5 }} className="h-full bg-white w-full rounded-full shadow-glow-white" />
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </motion.div>
          )}

          {activeTab === 'advisor' && (
            <motion.div key="advisor" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-16">
               <SectionTitle subtitle="Optimisation Continue du Hardware">Conseil Stratégique</SectionTitle>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {recommendations.map((rec, idx) => (
                   <motion.div key={rec.tag} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} className="p-16 rounded-[4rem] bg-white/[0.01] border border-white/10 group relative flex flex-col hover:bg-white/[0.02] transition-all">
                     <h4 className="text-5xl font-black text-white mb-8 uppercase tracking-widest leading-none">{rec.name}</h4>
                     <p className="text-xl text-slate-500 mb-12 leading-relaxed font-light italic">« {rec.reasoning} »</p>
                     <div className="space-y-4 mb-20 flex-1">
                        {rec.pros.map(pro => (
                          <div key={pro} className="flex items-center gap-6 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-500">
                             <div className="w-1.5 h-1.5 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                             {pro}
                          </div>
                        ))}
                     </div>
                     <div className="p-10 rounded-[2.5rem] border border-white/30 bg-white/[0.02]">
                        <p className="text-2xl text-white font-bold uppercase tracking-widest leading-tight italic">{rec.whyThisOver}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'watch' && (
            <motion.div key="watch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <SectionTitle subtitle="Intelligence Artificielle en Temps Réel">Veille LLM</SectionTitle>
               <div className="max-w-4xl mx-auto space-y-12 pb-40">
                 {watchFeed.map((item, idx) => (
                   <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, x: -100 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    className="p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all relative group"
                   >
                     {item.trending && (
                       <div className="absolute top-12 right-14 flex items-center gap-4 px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest">
                         <Rocket size={14} /> SOTA NEWS
                       </div>
                     )}
                     <div className="text-[11px] uppercase tracking-[0.6em] text-slate-500 font-black mb-10 flex items-center gap-5">
                       <span className="w-2 h-2 rounded-full bg-white opacity-40 group-hover:bg-emerald-400 group-hover:opacity-100 transition-all" />
                       {item.source}
                     </div>
                     <h4 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">{item.title}</h4>
                     <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-[11px] font-black text-white uppercase tracking-[0.5em] border-t border-white/10 pt-10 group-hover:gap-10 transition-all duration-700">DÉTAILS DE L'ANALYSE <ArrowUpRight size={18} /></a>
                   </motion.div>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Maillage Décoratif */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none opacity-10">
           <div className="absolute inset-x-0 top-0 h-[1000px] bg-gradient-to-b from-white/5 to-transparent blur-[160px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/[0.02] blur-[150px] rounded-full" />
        </div>
      </main>
    </div>
  );
}
