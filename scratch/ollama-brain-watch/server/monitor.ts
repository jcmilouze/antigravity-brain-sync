import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const app = express();
const port = 3001;

app.use(cors());

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

app.get('/api/watch', (req, res) => {
  const feed = [
    {
      id: 1,
      title: 'DeepSeek-V3 MoE Released',
      source: 'HuggingFace',
      date: new Date().toISOString(),
      url: 'https://huggingface.co/deepseek-ai/DeepSeek-V3',
      trending: true
    },
    {
      id: 2,
      title: 'Qwen 2.5 Coder 32B hits SOTA',
      source: 'Ollama Blog',
      date: new Date().toISOString(),
      url: 'https://ollama.com/library/qwen2.5-coder:32b',
      trending: true
    },
    {
      id: 3,
      title: 'Llama 3.2 Vision available on Ollama',
      source: 'Ollama Library',
      date: new Date().toISOString(),
      url: 'https://ollama.com/library/llama3.2-vision',
      trending: false
    }
  ];
  res.json(feed);
});

app.listen(port, () => {
  console.log(`Hardware monitor listening at http://localhost:${port}`);
});
