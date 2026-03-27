import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const PORT = 5051;
const PIPER_EXE = path.join(process.cwd(), 'bin', 'tts', 'piper', 'piper.exe');
const VOICE_MODEL = path.join(process.cwd(), 'bin', 'tts', 'voice.onnx');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  const text = reqUrl.searchParams.get('text');

  if (!text) {
    res.writeHead(400);
    res.end('Missing text parameter');
    return;
  }

  console.log(`[TTS] Synthesis for: "${text}"`);

  // On crée un fichier temporaire pour que le WAV ait le bon entête (taille exacte).
  const tmpBufferFile = path.join(process.cwd(), 'bin', 'tts', `tmp_${crypto.randomUUID()}.wav`);

  const piper = spawn(PIPER_EXE, [
    '--model', VOICE_MODEL,
    '--output_file', tmpBufferFile
  ], {
    stdio: ['pipe', 'ignore', 'inherit'] // On ignore le vrai stdout, Piper écrit dans le fichier
  });

  // On envoie le texte au moteur phonétique
  piper.stdin.write(text);
  piper.stdin.end();

  piper.on('close', (code) => {
    if (code !== 0) {
      console.error(`Erreur Piper (code: ${code})`);
      res.writeHead(500);
      res.end('Erreur de synthèse vocale');
      return;
    }

    try {
      // Lecture du fichier propre et envoi direct au navigateur
      const audioData = fs.readFileSync(tmpBufferFile);
      res.writeHead(200, { 
        'Content-Type': 'audio/wav',
        'Content-Length': audioData.length
      });
      res.end(audioData);
    } catch (e) {
      console.error(e);
      res.writeHead(500);
      res.end('Erreur de lecture du fichier');
    } finally {
      // On nettoie la trace pour ne pas encombrer le disque
      if (fs.existsSync(tmpBufferFile)) {
        fs.unlinkSync(tmpBufferFile);
      }
    }
  });

  req.on('close', () => {
    piper.kill();
  });
});

server.listen(PORT, () => {
  console.log(`--- L'Oreille du Renard est Activée ! ---`);
  console.log(`Le serveur Piper est prêt sur : http://localhost:${PORT}/tts?text=...`);
  console.log(`Utilise ton 4090 pour chanter des mots magiques.`);
});
