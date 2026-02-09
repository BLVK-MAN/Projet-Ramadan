"use server";

import { geminiModel, embeddingModel } from "@/lib/gemini";
import { pinecone, indexName } from "@/lib/pinecone";

export async function chatAction(message: string) {
    try {
        // 1. Generate Embedding for the query
        const embeddingResult = await embeddingModel.embedContent(message);
        const embedding = embeddingResult.embedding.values;

        // 2. Query Pinecone for context
        const index = pinecone.index(indexName);
        const queryResponse = await index.query({
            vector: embedding,
            topK: 3,
            includeMetadata: true,
        });

        const context = queryResponse.matches
            .map((match) => match.metadata?.text as string)
            .join("\n\n");

        // 3. Generate content with context
        const parts = [
            { text: "You are a helpful assistant for Ramadan charity activities in Casablanca." },
            { text: `Context:\n${context}` },
            { text: `User Question: ${message}` },
        ];

        const result = await geminiModel.generateContent({
            contents: [{ role: "user", parts }],
        });

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error in chatAction:", error);
        return "I'm sorry, I encountered an error while processing your request.";
    }
}
