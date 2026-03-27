import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ icon: Icon, label, value, unit, color }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="kpi-label">{label}</div>
                <Icon size={20} style={{ color }} />
            </div>
            <div className="kpi-value" style={{ color }}>
                {value}<span style={{ fontSize: '1rem', marginLeft: '4px', opacity: 0.7 }}>{unit}</span>
            </div>
            <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(parseFloat(value) || 0, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '100%', background: color }}
                />
            </div>
        </motion.div>
    );
};

export default KPICard;
