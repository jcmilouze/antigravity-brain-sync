import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Globe, HardDrive, RefreshCw, BrainCircuit, Sparkles, Send } from 'lucide-react';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import AdvisorPanel from './components/AdvisorPanel';
import { fetchSummary, fetchNodeInfo } from './services/netdata';
import { getAIAnalysis } from './services/groq';
import { analyzeMetrics } from './utils/advisor';
import './styles/App.css';


function App() {
  const [data, setData] = useState(null);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // AI State
  const [apiKey, setApiKey] = useState(localStorage.getItem('groq_key') || '');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState(null);

  const fetchAiAnalysis = async () => {
    if (!apiKey) {
      alert("Veuillez entrer une clé API Groq Cloud dans les paramètres.");
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await getAIAnalysis(data, apiKey);
      if (result.error) throw new Error(result.error);
      setAiAdvice(result);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'analyse AI : " + e.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const info = await fetchNodeInfo();
        setNodeInfo(info);
      } catch (e) { console.error('Info fetch failed', e); }
    };
    init();

    const poll = async () => {
      try {
        const summary = await fetchSummary();
        setData(summary);
        setAdvice(analyzeMetrics(summary));
        setLastUpdate(new Date());
        setLoading(false);
      } catch (e) {
        console.error('Polling failed', e);
      }
    };

    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <RefreshCw className="pulsate" size={48} color="#38bdf8" />
        <p style={{ color: '#94a3b8', fontFamily: 'Outfit' }}>Initialisation du dashboard Netdata...</p>
      </div>
    );
  }

  const getMetricValue = (dataset, candidates) => {
    if (!dataset || !dataset.labels || !dataset.data?.[0]) return 0;
    const idx = candidates.map(c => dataset.labels.indexOf(c)).find(i => i !== -1);
    return idx !== undefined ? Math.abs(dataset.data[0][idx]) : 0;
  };

  const currentCpu = data.cpu.data[0].slice(1).reduce((a, b) => a + b, 0).toFixed(1);
  const totalRam = data.ram.data[0].slice(1).reduce((a, b) => a + b, 0);
  const usedRam = getMetricValue(data.ram, ['used']);
  const ramPercent = ((usedRam / totalRam) * 100).toFixed(1);
  const diskIn = getMetricValue(data.disk, ['in', 'read']).toFixed(1);
  const netIn = getMetricValue(data.net, ['received', 'in']).toFixed(2);
  const storageUsed = getMetricValue(data.storage, ['used']);
  const storageTotal = data.storage ? data.storage.data[0].slice(1).reduce((a, b) => a + b, 0) : 1;
  const storagePercent = ((storageUsed / storageTotal) * 100).toFixed(1);

  return (
    <div className="App">
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
          <h1>Netdata <span style={{ fontWeight: 300 }}>Advisor</span></h1>
          <BrainCircuit size={40} color="#a855f7" className="pulsate" />
        </div>
        <p>Analyse intelligente en temps réel pour <strong>{nodeInfo?.hostname || 'Serveur'}</strong></p>

        <div className="ai-controls glass-card" style={{ maxWidth: '600px', margin: '20px auto', padding: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="password"
              placeholder="Entrez votre clé Groq Cloud..."
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('groq_key', e.target.value);
              }}
              style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            />
            <button
              className={`ai-btn ${isAiLoading ? 'loading' : ''}`}
              onClick={fetchAiAnalysis}
              disabled={isAiLoading}
            >
              {isAiLoading ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} />}
              Analyse Profonde AI
            </button>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>
          Dernière mise à jour : {lastUpdate.toLocaleTimeString()}
        </div>
      </header>

      <main className="dashboard-grid">
        {aiAdvice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ai-result-card glass-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <BrainCircuit color="#a855f7" />
              <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#a855f7' }}>Diagnostic Profond par Llama 3.3</h2>
            </div>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '24px' }}>
              {aiAdvice.diagnosis}
            </p>
            <div className="advisor-container" style={{ margin: 0 }}>
              {aiAdvice.recommendations && aiAdvice.recommendations.map((rec, idx) => (
                <div key={idx} className="advice-item info" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <Sparkles size={20} color="#a855f7" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{rec.title}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{rec.description}</div>
                      <div className="command-box">
                        <code className="command-text">
                          <span className="prompt">$</span> {rec.command}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <KPICard
          icon={Cpu}
          label="Charge CPU"
          value={currentCpu}
          unit="%"
          color="#38bdf8"
        />
        <KPICard
          icon={Database}
          label="Utilisation RAM"
          value={ramPercent}
          unit="%"
          color="#10b981"
        />
        <KPICard
          icon={HardDrive}
          label="Stockage (Usage)"
          value={storagePercent}
          unit="%"
          color="#f59e0b"
        />
        <KPICard
          icon={Globe}
          label="Réseau (In)"
          value={netIn}
          unit="kbps"
          color="#a855f7"
        />

        <MetricChart
          data={data.cpu}
          title="Historique CPU (%)"
          color="#38bdf8"
          dataKey="cpu"
        />
        <MetricChart
          data={data.ram}
          title="Historique RAM (MiB)"
          color="#10b981"
          dataKey="ram"
        />
        <MetricChart
          data={data.storage}
          title="Historique Stockage (GiB)"
          color="#f59e0b"
          dataKey="storage"
        />

        <AdvisorPanel advice={advice} />
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontSize: '0.9rem' }}>
        Status: <Activity size={12} style={{ color: '#10b981' }} /> Système Connecté à 62.212.70.10
      </footer>
    </div>
  );
}

export default App;
