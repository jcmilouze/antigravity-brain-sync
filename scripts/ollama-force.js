const http = require('http');
const fs = require('fs');
const path = require('fs');

/**
 * Antigravity Ollama Force Connector v1.1.0
 * Purpose: Reliable local generation with direct file output.
 */

const args = process.argv.slice(2);
const prompt = args[0] || 'Hello';
const model = args[1] || 'qwen2.5-coder:32b';
const outputFilePath = args[2] || null; // Optional output file path
const system = args[3] || 'You are an elite coding assistant. Respond with CODE ONLY. No chat, no markdown blocks, just the raw code.';

const postData = JSON.stringify({
    model: model,
    prompt: prompt,
    system: system,
    stream: false,
    options: {
        num_ctx: 16384,
        temperature: 0.1
    }
});

const options = {
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/generate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.response) {
                const cleanedResponse = response.response.trim();
                if (outputFilePath) {
                    require('fs').writeFileSync(outputFilePath, cleanedResponse, 'utf8');
                    console.log(`✅ Generation complete. Output saved to: ${outputFilePath}`);
                } else {
                    process.stdout.write(cleanedResponse);
                }
            } else {
                process.stderr.write("Error: No 'response' field.\n");
            }
        } catch (e) {
            process.stderr.write("Parsing Error: " + e.message + "\n");
        }
    });
});

req.on('error', (e) => {
    process.stderr.write(`Ollama Error: ${e.message}\n`);
});

req.write(postData);
req.end();
