import { useState, useCallback } from 'react';

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(async (text: string) => {
    if (!text) return;

    setIsSpeaking(true);
    setError(null);

    try {
      // URL du serveur Piper local (Plan B - Hors Docker)
      const apiUrl = `http://localhost:5051/tts?text=${encodeURIComponent(text)}`;
      
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Le magicien de la voix est occupé (${response.statusText})`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        setError("Oups, je n'ai pas pu chanter ce mot.");
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (err) {
      console.error("Speech error:", err);
      setError(err instanceof Error ? err.message : "Erreur de connexion au serveur de voix");
      setIsSpeaking(false);
    }
  }, []);

  return { speak, isSpeaking, error };
};
