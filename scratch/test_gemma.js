async function testGemma() {
  const url = 'http://localhost:1234/v1/chat/completions';
  const data = {
    model: "google/gemma-3-27b",
    messages: [
      { role: "user", content: "Donne moi le code TSX pour une FeatureCard avec Tailwind. Juste le code." }
    ]
  };
  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(60000)
    });
    const result = await response.json();
    console.log(result.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
testGemma();
