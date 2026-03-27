const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const getAIAnalysis = async (metrics, apiKey) => {
    if (!apiKey) return { error: "Clé API manquante" };

    const prompt = `Tu es un expert en administration système Linux et performance serveur. 
    On te fournit des métriques Netdata actuelles d'un serveur Debian. 
    Analyse les données suivantes et propose :
    1. Un diagnostic court et précis.
    2. Une liste de 1 à 3 commandes Debian spécifiques pour corriger ou investiguer les problèmes détectés.
    
    METRIQUES :
    - CPU: ${JSON.stringify(metrics.cpu.data[0])}
    - RAM: ${JSON.stringify(metrics.ram.data[0])}
    - Disk I/O: ${JSON.stringify(metrics.disk.data[0])}
    
    IMPORTANT: Réponds uniquement en format JSON strict comme ceci :
    {
      "diagnosis": "...",
      "recommendations": [
        {"title": "...", "command": "...", "description": "..."}
      ]
    }`;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (error) {
        console.error("Erreur Groq:", error);
        return { error: "Échec de l'analyse AI" };
    }
};
