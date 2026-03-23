import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface VramMonitorProps {
  used: number;
  total: number;
}

const VramMonitor: React.FC<VramMonitorProps> = ({ used, total }) => {
  const percentage = (used / total) * 100;

  return (
    <div className="w-64 h-64 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 rounded-full shadow-lg">
      <CircularProgressbar
        value={percentage}
        text={`${used} / ${total}`}
        strokeWidth={12}
        styles={{
          path: {
            stroke: `conic-gradient(from 90deg, #3490dc, #6574cd)`,
            strokeLinecap: 'round',
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center 0px',
          },
          trail: { stroke: '#1a202c', strokeLinecap: 'round' },
          text: {
            fill: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
};

export default VramMonitor;