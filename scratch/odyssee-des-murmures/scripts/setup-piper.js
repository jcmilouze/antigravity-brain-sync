import fs from 'fs';
import https from 'https';
import { execSync } from 'child_process';
import path from 'path';

const PIPER_ZIP_URL = 'https://github.com/rhasspy/piper/releases/download/v1.2.0/piper_windows_amd64.zip';
const VOICE_ONNX_URL = 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx';
const VOICE_JSON_URL = 'https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx.json';

const binDir = path.join(process.cwd(), 'bin', 'tts');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function setup() {
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

  console.log('--- Téléchargement du moteur Piper ---');
  await download(PIPER_ZIP_URL, path.join(binDir, 'piper.zip'));
  
  console.log('--- Extraction de l\'archive ---');
  try {
    // Utiliser PowerShell pour extraire si disponible, sinon on tentera une autre méthode
    execSync(`powershell -Command "Expand-Archive -Path '${path.join(binDir, 'piper.zip')}' -DestinationPath '${binDir}' -Force"`);
  } catch (e) {
    console.error('Erreur extraction:', e.message);
  }

  console.log('--- Téléchargement du modèle vocal ---');
  await download(VOICE_ONNX_URL, path.join(binDir, 'voice.onnx'));
  await download(VOICE_JSON_URL, path.join(binDir, 'voice.onnx.json'));

  console.log('--- Installation Terminée ---');
}

setup().catch(console.error);
