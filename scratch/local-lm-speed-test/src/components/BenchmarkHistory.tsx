import { BenchmarkResult } from '../App'

interface BenchmarkHistoryProps {
  history: BenchmarkResult[];
  onClear: () => void;
}

const BenchmarkHistory = ({ history, onClear }: BenchmarkHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="glass-card p-10 rounded-3xl mt-12 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <span className="text-sky-400">🕒</span> Historique des Tests
        </h2>
        <button 
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-red-400 uppercase tracking-widest font-bold transition-colors"
        >
          Effacer tout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-white/5 text-[10px] text-gray-500 uppercase tracking-widest px-4">
            <tr>
              <th className="pb-4 font-bold">Modèle / Config</th>
              <th className="pb-4 font-bold">Vitesse (TPS)</th>
              <th className="pb-4 font-bold">Latence (TTFT)</th>
              <th className="pb-4 font-bold">Poids (Go)</th>
              <th className="pb-4 font-bold text-right">Efficience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.slice().reverse().map((entry, idx) => (
              <tr key={idx} className="group hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="font-bold text-white group-hover:text-sky-400 transition-colors truncate max-w-[200px]">
                    {entry.modelName}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    {new Date(entry.timestamp || '').toLocaleString('fr-FR')}
                  </div>
                </td>
                <td className="py-4 font-mono font-black text-sky-400">
                  {entry.tps.toFixed(1)} <span className="text-[10px] opacity-50">t/s</span>
                </td>
                <td className="py-4 font-mono text-amber-400">
                  {entry.ttft ? `${entry.ttft.toFixed(0)}ms` : '--'}
                </td>
                <td className="py-4 font-mono text-indigo-400">
                  {entry.modelSize} Go
                </td>
                <td className="py-4 text-right">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
                    {(entry.tps / entry.modelSize).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenchmarkHistory;
