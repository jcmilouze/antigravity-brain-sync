import axios from 'axios';

export type TaskCategory = 'DEVELOPPEMENT' | 'RAISONNEMENT' | 'RAPIDE' | 'VISION' | 'LOGIQUE_PURE';

export interface OrchestrationResult {
  recommendedModel: string;
  category: TaskCategory;
  confidence: number;
  reason: string;
}

const OLLAMA_HOST = 'http://localhost:11434';

/**
 * Le Cerveau d'Orchestration Antigravity
 */
export const classifyTask = (task: string): OrchestrationResult => {
  const t = task.toLowerCase();

  // Logique de classification "Hardware-Aware" (RTX 4090)
  
  if (t.includes('code') || t.includes('python') || t.includes('react') || t.includes('bug') || t.includes('algorithme')) {
    return {
      recommendedModel: 'qwen2.5-coder:32b',
      category: 'DEVELOPPEMENT',
      confidence: 0.95,
      reason: 'SOTA Coding reconnu pour sa précision chirurgicale sur de larges contextes.'
    };
  }

  if (t.includes('pourquoi') || t.includes('analyse') || t.includes('pense') || t.includes('strategie') || t.includes('reflexion')) {
    return {
      recommendedModel: 'mistral-nemo:12b',
      category: 'RAISONNEMENT',
      confidence: 0.88,
      reason: 'Modèle équilibré optimisant la réflexion logique sans latence excessive.'
    };
  }

  if (t.includes('deepseek') || t.includes('complexe') || t.includes('limites')) {
    return {
      recommendedModel: 'deepseek-v3:lite',
      category: 'LOGIQUE_PURE',
      confidence: 0.92,
      reason: 'Architecture MoE optimale pour les raisonnements mathématiques profonds.'
    };
  }

  if (t.includes('image') || t.includes('voit') || t.includes('description') || t.includes('regarde')) {
    return {
      recommendedModel: 'llama3.2-vision:latest',
      category: 'VISION',
      confidence: 0.90,
      reason: 'Interprétation visuelle de pointe intégrée localement.'
    };
  }

  // Fallback vers le "Speed King"
  return {
    recommendedModel: 'llama3.1:8b',
    category: 'RAPIDE',
    confidence: 0.80,
    reason: 'Modèle ultra-rapide idéal pour les interactions immédiates et la navigation.'
  };
};

/**
 * Pilotage Actif d'Ollama : Force le chargement d'un modèle précis
 */
export const orchestrateLoading = async (modelName: string) => {
  try {
    // Ollama charge sur invocation. On envoie un ping minimaliste pour précharger le modèle.
    // Cela permet de "réchauffer" la VRAM avant l'usage réel.
    await axios.post(`${OLLAMA_HOST}/api/generate`, {
      model: modelName,
      prompt: '',
      keep_alive: '10m' // Garde le modèle en VRAM pendant 10 min
    });
    return true;
  } catch (error) {
    console.error(`Erreur d'orchestration pour ${modelName}:`, error);
    return false;
  }
};

/**
 * Nettoyage VRAM : Pour libérer de l'espace sur la 4090 si besoin
 * Bien qu'Ollama gère le swapping, forcer le déchargement libère le cache CUDA.
 */
export const unloadAllModels = async () => {
  // Technique Ollama : Envoyer keep_alive: 0 décharge immédiatement
  // Note: On pourrait aussi utiliser des requêtes pour chaque modèle connu.
  console.log("Purge de la VRAM demandée.");
};

export const runOrchestratedTask = async (task: string) => {
  const analysis = classifyTask(task);
  console.log(`Orchestration en cours : Cible [${analysis.recommendedModel}] pour tâche [${analysis.category}]`);
  
  const success = await orchestrateLoading(analysis.recommendedModel);
  return { ...analysis, success };
};
