import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal, Copy, Check } from 'lucide-react';

const AdvisorPanel = ({ advice }) => {
    const [copiedIdx, setCopiedIdx] = useState(null);

    const getIcon = (level) => {
        switch (level) {
            case 'critical': return <AlertCircle className="pulsate" style={{ color: '#ef4444' }} />;
            case 'warning': return <AlertTriangle style={{ color: '#f59e0b' }} />;
            case 'success': return <CheckCircle style={{ color: '#10b981' }} />;
            default: return <Info style={{ color: '#38bdf8' }} />;
        }
    };

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    return (
        <div className="advisor-container">
            <h2 style={{ margin: '40px 0 20px 0', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={24} />
                Conseils & Analyse Intelligente
            </h2>
            <AnimatePresence>
                {advice.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`advice-item ${item.level}`}
                    >
                        <div style={{ display: 'flex', gap: '15px' }}>
                            {getIcon(item.level)}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {item.category}
                                </div>
                                <div style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.5' }}>
                                    {item.text}
                                </div>

                                {item.command && (
                                    <div className="command-box">
                                        <div className="command-header">
                                            <span>Debian Terminal</span>
                                            <button
                                                onClick={() => handleCopy(item.command, idx)}
                                                className="copy-btn"
                                            >
                                                {copiedIdx === idx ? <Check size={14} /> : <Copy size={14} />}
                                                {copiedIdx === idx ? 'Copié !' : 'Copier'}
                                            </button>
                                        </div>
                                        <code className="command-text">
                                            <span className="prompt">$</span> {item.command}
                                        </code>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AdvisorPanel;
