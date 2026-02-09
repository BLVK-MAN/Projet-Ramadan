const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testSpecificModel() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = "gemini-embedding-001";

    console.log(`Testing ${modelName}...`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.embedContent("Test string");
        console.log(`SUCCESS: ${modelName} works!`);
        console.log(`Embedding length: ${result.embedding.values.length}`);
    } catch (e) {
        console.log(`FAILED: ${modelName}`);
        console.log(`Error: ${e.message}`);
    }
}

testSpecificModel();
