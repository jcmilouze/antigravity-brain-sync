import { useState, useEffect } from 'react';
import axios from 'axios';

export interface HardwareInfo {
  name: string;
  vram_total: number;
  vram_used: number;
  temperature: number;
  status: 'online' | 'simulated' | 'error';
}

export const useHardware = () => {
  const [hardware, setHardware] = useState<HardwareInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHardware = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/hardware');
        setHardware(data);
      } catch (error) {
        console.error('Hardware detect failed, using fallback.');
        setHardware({
          name: 'NVIDIA GeForce RTX 4090 (Fallback)',
          vram_total: 24576,
          vram_used: 0,
          temperature: 0,
          status: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHardware();
    const interval = setInterval(fetchHardware, 5000);
    return () => clearInterval(interval);
  }, []);

  return { hardware, loading };
};
