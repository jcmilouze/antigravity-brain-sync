const url = 'https://n8n.bessacvps.fr/webhook/velotrack-ai';

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        prompt: "Fais une belle boucle gravel de 60km vers le nord",
        lat: 48.8,
        lng: 2.3
    })
})
    .then(async res => {
        const data = await res.json();
        console.log("RÉPONSE N8N (SUCCÈS) :");
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("ERREUR :", err.message);
    });
