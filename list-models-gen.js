const https = require('https');
const fs = require('fs');
require("dotenv").config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            let output = "";
            if (json.models) {
                output += "--- SUPPORTED GENERATIVE MODELS (generateContent) ---\n";
                const genModels = json.models.filter(m =>
                    m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
                );

                if (genModels.length === 0) {
                    output += "NO GENERATIVE MODELS FOUND.\n";
                } else {
                    genModels.forEach(m => output += m.name + "\n");
                }
                output += "---------------------------------------------------\n";
            } else {
                output += "Error or no models: " + JSON.stringify(json) + "\n";
            }

            fs.writeFileSync('models_clean.txt', output, 'utf8');
            console.log("Models written to models_clean.txt");

        } catch (e) {
            console.error("Parse error:", e);
        }
    });
}).on('error', (e) => {
    console.error("Request error:", e);
});
