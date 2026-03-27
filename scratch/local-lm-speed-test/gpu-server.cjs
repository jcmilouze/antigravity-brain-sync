const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/gpu', (req, res) => {
  // Query nvidia-smi for utilization, memory usage, and temperature
  const command = 'nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total,temperature.gpu --format=csv,noheader,nounits';
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'NVIDIA-SMI not found or failed', details: stderr });
    }
    
    const [utilization, memUsed, memTotal, temp] = stdout.trim().split(', ');
    
    res.json({
      utilization: parseInt(utilization),
      memoryUsed: parseInt(memUsed),
      memoryTotal: parseInt(memTotal),
      temperature: parseInt(temp),
      timestamp: new Date().toISOString()
    });
  });
});

app.listen(port, () => {
  console.log(`GPU Monitor Server listening at http://localhost:${port}`);
});
