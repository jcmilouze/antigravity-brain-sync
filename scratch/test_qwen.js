async function testQwen32B() {
  const url = 'http://localhost:1234/v1/chat/completions';
  const data = {
    model: "qwen/qwen2.5-coder-32b",
    messages: [
      { role: "system", content: "Tu es un expert Frontend Senior spécialisé dans le design haut de gamme et les animations. Réponds en français. Utilise Tailwind CSS." },
      { role: "user", content: "Conçois un composant React `FeatureCard.tsx` ultra-premium avec Tailwind CSS. Exigences : Glassmorphism (bg-white/10 backdrop-blur-md, border border-white/20), Effet de survol dynamique (scale-105 + glow), Titre font-black, description font-medium, Image de fond avec overlay dégradé sombre, Lucide-react pour les icônes. Fournis uniquement le code TSX complet." }
    ],
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(300000)
    });
    const result = await response.json();
    console.log(result.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testQwen32B();
