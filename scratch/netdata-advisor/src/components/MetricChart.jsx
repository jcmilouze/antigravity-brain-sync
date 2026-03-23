import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricChart = ({ data, title, color, dataKey }) => {
    if (!data || !data.data) return null;

    // Transform Netdata format to Recharts format
    // labels: ["time", "user", "system", ...]
    // data: [[timestamp, val1, val2...], ...]
    const chartData = data.data.map(row => {
        const obj = { time: new Date(row[0] * 1000).toLocaleTimeString() };
        data.labels.forEach((label, idx) => {
            if (idx > 0) obj[label] = row[idx];
        });
        return obj;
    }).reverse();

    return (
        <div className="glass-card" style={{ height: '300px', gridColumn: 'span 2', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1rem', color: '#94a3b8', flexShrink: 0 }}>{title}</h3>
            <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        {data.labels.filter(l => l !== 'time').map((label, idx) => (
                            <Area
                                key={label}
                                type="monotone"
                                dataKey={label}
                                stroke={color}
                                fillOpacity={1}
                                fill={`url(#color${dataKey})`}
                                stackId="1"
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MetricChart;
