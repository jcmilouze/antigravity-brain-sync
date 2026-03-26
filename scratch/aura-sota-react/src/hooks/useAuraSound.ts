import { useCallback, useRef } from 'react';

export const useAuraSound = () => {
    const audioCtx = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, []);

    const playScanSound = useCallback(() => {
        initAudio();
        if (!audioCtx.current) return;

        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.current.currentTime + 0.8);

        gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        osc.start();
        osc.stop(audioCtx.current.currentTime + 0.8);
    }, [initAudio]);

    const playSuccessSound = useCallback(() => {
        initAudio();
        if (!audioCtx.current) return;

        const playTone = (freq: number, time: number, duration: number) => {
            if (!audioCtx.current) return;
            const osc = audioCtx.current.createOscillator();
            const gain = audioCtx.current.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime + time);
            gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime + time);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + time + duration);
            osc.connect(gain);
            gain.connect(audioCtx.current.destination);
            osc.start(audioCtx.current.currentTime + time);
            osc.stop(audioCtx.current.currentTime + time + duration);
        };

        playTone(880, 0, 0.4);
        playTone(1320, 0.1, 0.6);
    }, [initAudio]);

    return { playScanSound, playSuccessSound };
};
