export const analyzeMetrics = (data) => {
    const advice = [];

    if (!data || !data.cpu || !data.ram) return advice;

    // CPU Analysis
    const cpuTotal = data.cpu.data[0].slice(1).reduce((a, b) => a + b, 0);

    if (cpuTotal > 80) {
        advice.push({
            category: 'CPU',
            level: 'critical',
            text: 'Utilisation CPU très élevée (>80%). Vérifiez les processus gourmands.',
            command: 'ps aux --sort=-%cpu | head -n 10'
        });
    } else if (cpuTotal > 50) {
        advice.push({
            category: 'CPU',
            level: 'warning',
            text: 'Le CPU commence à être sollicité.',
            command: 'top -b -n 1 | head -n 20'
        });
    }

    // RAM Analysis
    const usedRamIdx = data.ram.labels.indexOf('used');
    const usedRam = data.ram.data[0][usedRamIdx];
    const totalRam = data.ram.data[0].slice(1).reduce((a, b) => a + b, 0);
    const ramPercent = (usedRam / totalRam) * 100;

    if (ramPercent > 90) {
        advice.push({
            category: 'RAM',
            level: 'critical',
            text: 'Mémoire RAM saturée. Risque de swap imminent.',
            command: 'free -h && sync; echo 3 | sudo tee /proc/sys/vm/drop_caches'
        });
    } else if (ramPercent > 75) {
        advice.push({
            category: 'RAM',
            level: 'warning',
            text: 'Utilisation de la RAM élevée.',
            command: 'ps aux --sort=-%mem | head -n 10'
        });
    }

    // Network Analysis
    const netInIdx = data.net.labels.indexOf('received');
    const netOutIdx = data.net.labels.indexOf('sent');
    const netIn = Math.abs(data.net.data[0][netInIdx]);
    const netOut = Math.abs(data.net.data[0][netOutIdx]);

    if (netIn > 80000 || netOut > 80000) {
        advice.push({
            category: 'Network',
            level: 'info',
            text: 'Trafic réseau intense détecté.',
            command: 'sudo nload'
        });
    }

    // Storage Analysis
    if (data.storage) {
        const usedIdx = data.storage.labels.indexOf('used');
        const availIdx = data.storage.labels.indexOf('avail');
        const used = data.storage.data[0][usedIdx];
        const total = data.storage.data[0].slice(1).reduce((a, b) => a + b, 0);
        const storagePercent = (used / total) * 100;

        if (storagePercent > 90) {
            advice.push({
                category: 'Stockage',
                level: 'critical',
                text: `Espace disque critique (${storagePercent.toFixed(1)}%).`,
                command: 'sudo journalctl --vacuum-time=1d && sudo apt-get clean'
            });
        } else if (storagePercent > 80) {
            advice.push({
                category: 'Stockage',
                level: 'warning',
                text: `L'espace disque est presque plein (${storagePercent.toFixed(1)}%).`,
                command: 'df -h | grep "^/dev/"'
            });
        }
    }

    if (advice.length === 0) {
        advice.push({
            category: 'Général',
            level: 'success',
            text: 'Tout semble fonctionner parfaitement !',
            command: 'uptime -p'
        });
    }

    return advice;
};
