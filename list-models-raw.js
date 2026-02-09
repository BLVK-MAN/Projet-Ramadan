const https = require('https');
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("\n--- SUPPORTED EMBEDDING MODELS ---");
                const embeddingModels = json.models.filter(m =>
                    m.supportedGenerationMethods && m.supportedGenerationMethods.includes("embedContent")
                );

                if (embeddingModels.length === 0) {
                    console.log("NO EMBEDDING MODELS FOUND.");
                } else {
                    embeddingModels.forEach(m => console.log(m.name));
                }
                console.log("----------------------------------\n");
            } else {
                console.log("Error or no models:", json);
            }
        } catch (e) {
            console.error("Parse error:", e);
        }
    });
}).on('error', (e) => {
    console.error("Request error:", e);
});
