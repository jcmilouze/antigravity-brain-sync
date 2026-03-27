/**
 * Script CLI d'Orchestration Antigravity pour Ollama (Native Fetch - No Dependencies)
 * Usage: node orchestrate.js "Ta requête ici"
 */

const OLLAMA_HOST = 'http://localhost:11434';

const classifyTask = (task) => {
  const t = task.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
  
  if (t.includes('code') || t.includes('python') || t.includes('react') || t.includes('bug') || t.includes('algorithme') || t.includes('script') || t.includes('typescript')) {
    return { model: 'qwen2.5-coder:32b', category: 'DEVELOPPEMENT' };
  }
  if (t.includes('raisonnement') || t.includes('pourquoi') || t.includes('analyse') || t.includes('strategie') || t.includes('deepseek') || t.includes('reflexion') || t.includes('think')) {
    return { model: 'deepseek-r1:14b', category: 'RAISONNEMENT' };
  }
  if (t.includes('image') || t.includes('vision') || t.includes('regarde')) {
    return { model: 'llama3.2-vision:latest', category: 'VISION' };
  }
  if (t.includes('redige') || t.includes('ecris') || t.includes('marketing') || t.includes('francais')) {
    return { model: 'mistral-nemo:latest', category: 'REDACTION' };
  }
  return { model: 'llama3.1:8b', category: 'GENERAL' };
};

const main = async () => {
  const prompt = process.argv.slice(2).join(' ');
  if (!prompt) {
    console.error("Erreur : Aucun prompt fourni.");
    process.exit(1);
  }

  const { model, category } = classifyTask(prompt);
  
  process.stdout.write(`[ORCHESTRATEUR] Catégorie : ${category} | Moteur : ${model} | Analyse en cours... \n`);

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
        options: {
          num_ctx: 16384
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    console.log("\n--- RÉPONSE DU MODÈLE LOCAL ---\n");
    console.log(data.response);
  } catch (error) {
    console.error("Erreur d'exécution locale :", error.message);
    process.exit(1);
  }
};

main();
