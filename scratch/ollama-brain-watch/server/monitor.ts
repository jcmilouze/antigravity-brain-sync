import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const app = express();
const port = 3001;

app.use(cors());

// --- HISTORICAL DATA STORE ---
interface HistoryPoint {
  timestamp: string;
  vram_used: number;
  vram_total: number;
  models: { name: string; size: string; processor: string }[];
}

let usageHistory: HistoryPoint[] = [];
const MAX_HISTORY_POINTS = 50;

// Poll hardware & Ollama status every 5 seconds
const pollStatus = async () => {
  try {
    // 1. Get GPU Stats
    let vramUsed = 0;
    let vramTotal = 24576;
    try {
      const { stdout } = await execAsync('nvidia-smi --query-gpu=memory.total,memory.used --format=csv,noheader,nounits');
      const [total, used] = stdout.trim().split(', ');
      vramTotal = parseInt(total);
      vramUsed = parseInt(used);
    } catch (e) {
      vramUsed = 1024 + Math.random() * 500; // Mock if no NVIDIA
    }

    // 2. Get Ollama Active Models
    let activeModels: { name: string; size: string; processor: string }[] = [];
    try {
      const { stdout: psOutput } = await execAsync('ollama ps');
      const lines = psOutput.trim().split('\n').slice(1); // Skip header
      activeModels = lines.map(line => {
        const parts = line.trim().split(/\s{2,}/);
        return {
          name: parts[0] || 'Unknown',
          size: parts[2] || '0 GB',
          processor: parts[3] || 'CPU'
        };
      }).filter(m => m.name !== 'Unknown');
    } catch (e) {
      // No active models or ollama not running
    }

    // 3. Save to history
    const point: HistoryPoint = {
      timestamp: new Date().toLocaleTimeString(),
      vram_used: vramUsed,
      vram_total: vramTotal,
      models: activeModels
    };

    usageHistory.push(point);
    if (usageHistory.length > MAX_HISTORY_POINTS) {
      usageHistory.shift();
    }
  } catch (error) {
    console.error('Polling error:', error);
  }
};

setInterval(pollStatus, 5000);
pollStatus(); // Start immediately

// --- ENDPOINTS ---

app.get('/api/hardware', async (req, res) => {
  try {
    const { stdout } = await execAsync('nvidia-smi --query-gpu=name,memory.total,memory.used,temperature.gpu --format=csv,noheader,nounits');
    const [name, total, used, temp] = stdout.trim().split(', ');
    res.json({
      name,
      vram_total: parseInt(total),
      vram_used: parseInt(used),
      temperature: parseInt(temp),
      status: 'online'
    });
  } catch (error) {
    res.json({
      name: 'NVIDIA GeForce RTX 4090 (Simulated)',
      vram_total: 24576,
      vram_used: 1024,
      temperature: 42,
      status: 'simulated'
    });
  }
});

app.get('/api/history', (req, res) => {
  res.json(usageHistory);
});

app.get('/api/watch', (req, res) => {
  const feed = [
    {
      id: 1,
      title: 'DeepSeek-V3 MoE Released',
      source: 'HuggingFace',
      date: new Date().toISOString(),
      trending: true
    },
    {
      id: 2,
      title: 'Qwen 2.5 Coder 32B hits SOTA',
      source: 'Ollama Blog',
      date: new Date().toISOString(),
      trending: true
    }
  ];
  res.json(feed);
});

app.listen(port, () => {
  console.log(`🚀 Cognitive Cockpit Server : http://localhost:${port}`);
});
