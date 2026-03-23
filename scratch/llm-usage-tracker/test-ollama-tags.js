const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: 11434,
    path: '/api/tags',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        } catch (e) {
            console.error("Error parsing response:", e.message);
        }
    });
});

req.on('error', (e) => console.error("Ollama Offline"));
req.end();
