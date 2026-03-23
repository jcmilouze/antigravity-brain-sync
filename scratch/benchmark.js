const fs = require('fs');
const path = require('path');

async function benchmark() {
    const url = 'http://localhost:1234/v1/chat/completions';
    const payload = {
        model: 'qwen/qwen3-coder-next',
        messages: [
            {
                role: 'user',
                content: `Génère TaskMonitor monorepo local complet :

Structure :
/frontend (React Vite TS Tailwind)
/backend (Express TS Prisma SQLite)
/prisma/schema.prisma (User Task Project)
/scripts/dev.sh (npm run dev fullstack)

Fonctionnalités :

Dashboard tokens used (graph 24h)

CRUD Tasks + QuickAdd NLP

Responsive Tailwind dark mode

Code 100% fonctionnel :

npm install

npx prisma migrate dev

npm run dev \u2192 localhost:3000

Ton setup RTX 4090 + Ryzen 5800X XMP = beast !`
            }
        ],
        temperature: 0.1,
        max_tokens: 3000,
        stream: true
    };

    console.log(`Starting benchmark to ${url}...`);
    const startTime = Date.now();
    let tokenCount = 0;
    let fullText = '';

    const streamFile = path.join(__dirname, 'benchmark_output.md');
    const writeStream = fs.createWriteStream(streamFile);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const content = line.slice(6).trim();
                    if (content === '[DONE]') break;
                    try {
                        const data = JSON.parse(content);
                        const delta = data.choices[0].delta.content;
                        if (delta) {
                            writeStream.write(delta);
                            fullText += delta;
                            tokenCount++;
                            if (tokenCount % 100 === 0) {
                                console.log(`Received ${tokenCount} tokens...`);
                            }
                        }
                    } catch (e) {
                        // Ignore parse errors from fragmentary data if they happen
                    }
                }
            }
        }

        writeStream.end();
        const endTime = Date.now();
        const durationSec = (endTime - startTime) / 1000;
        const tps = tokenCount / durationSec;

        const results = {
            duration: durationSec,
            token_count: tokenCount,
            tps: tps
        };

        fs.writeFileSync(path.join(__dirname, 'benchmark_results.json'), JSON.stringify(results, null, 2));
        console.log(`\nDONE! Tokens: ${tokenCount}, Time: ${durationSec.toFixed(2)}s, TPS: ${tps.toFixed(2)}`);

    } catch (error) {
        console.error('Benchmark failed:', error);
    }
}

benchmark();
