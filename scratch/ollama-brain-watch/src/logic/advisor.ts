export interface RecommendedModel {
  name: string;
  tag: string;
  description: string;
  vram_required: number;
  category: 'code' | 'reasoning' | 'vision' | 'agent';
  score: number;
  reasoning: string;
  pros: string[];
  whyThisOver: string;
}

export const getRecommendations = (vramTotalMB: number): RecommendedModel[] => {
  const vramTotalGB = vramTotalMB / 1024;
  const models: RecommendedModel[] = [
    {
      name: 'Qwen 2.5 Coder 32B',
      tag: 'qwen2.5-coder:32b',
      description: 'The state-of-the-art for local software engineering.',
      vram_required: 19,
      category: 'code',
      score: 98,
      reasoning: 'Avec ta 4090, ce modèle est ton meilleur allié. Il surpasse Llama 3.1 70B sur le code pur tout en étant beaucoup plus vif.',
      pros: ['SOTA sur Python/JS', 'Contexte 128k', 'Très réactif'],
      whyThisOver: 'Mieux que Llama 3.1 70B (trop lourd) et 8B (trop imprécis).'
    },
    {
      name: 'DeepSeek R1 14B',
      tag: 'deepseek-r1:14b',
      description: 'Le champion actuel du raisonnement logique (Thinking Mode).',
      vram_required: 9.5,
      category: 'reasoning',
      score: 96,
      reasoning: 'Le premier modèle local capable de "réfléchir" avant de répondre. Indispensable pour l\'algorithmique et le debug complexe.',
      pros: ['Thinking process visible', 'Précision mathématique SOTA', 'Excellent pour la logique pure'],
      whyThisOver: 'Bien plus intelligent que Llama 3.1 8B ou Mistral Nemo pour le raisonnement pur.'
    },
    {
      name: 'Mistral Nemo 12B',
      tag: 'mistral-nemo:12b',
      description: 'Le compagnon idéal pour le chat quotidien.',
      vram_required: 8,
      category: 'agent',
      score: 85,
      reasoning: 'Optimisé pour les RTX, il s\'insalle en un éclair dans ton cache VRAM.',
      pros: ['Ultra-rapide', 'Faible latence', 'Bon en Français'],
      whyThisOver: 'Mieux que Gemma 2 9B car plus polyvalent.'
    },
    {
      name: 'Llama 3.2 Vision 11B',
      tag: 'llama3.2-vision:11b',
      description: 'Le meilleur pour l\'analyse d\'images et d\'UI.',
      vram_required: 10,
      category: 'vision',
      score: 88,
      reasoning: 'Indispensable pour tes projets frontend.',
      pros: ['Vision native', 'Léger', 'Très bon en OCR'],
      whyThisOver: 'Mieux que Llava v1.5.'
    }
  ];

  return models
    .filter(m => m.vram_required <= vramTotalGB + 2)
    .sort((a, b) => b.score - a.score);
};

export const getUpgradePath = (localModelName: string): { target: string, reason: string } | null => {
  const name = localModelName.toLowerCase();
  
  // Rule for tiny models on a 4090
  if (name.includes('1b') || name.includes('3b')) {
    return { 
      target: 'Llama 3.1 8B ou Mistral Nemo 12B', 
      reason: 'Tu as 24GB de VRAM, profite d\'un modèle bien plus intelligent sans ralentissement.' 
    };
  }

  if (name.includes('codellama') || name.includes('codestral')) {
    return { 
      target: 'Qwen 2.5 Coder 32B', 
      reason: 'Bien plus précis sur le code moderne.' 
    };
  }
  
  if (name.includes('llama3:8b') || name.includes('llama:8b')) {
    return { 
      target: 'Llama 3.1 8B', 
      reason: 'Contexte 128k (contre 8k) et meilleure cohérence.' 
    };
  }

  if (name.includes('llava')) {
    return { 
      target: 'Llama 3.2 Vision 11B', 
      reason: 'Vision et OCR de nouvelle génération.' 
    };
  }

  // If already at 12/14b, check for the next step (32b) if it's not a coder model
  if ((name.includes('nemo') || name.includes('mistral')) && !name.includes('32b')) {
     // No strong recommendation if they already have nemo, but 4090 can do 32b
  }

  return null;
};
