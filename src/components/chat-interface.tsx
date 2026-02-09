"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { SadaqaPulse } from "@/components/sadaqa-pulse";
import { chatAction } from "@/actions/chat-action";

export function ChatInterface() {
    const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user" as const, content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const responseText = await chatAction(input);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: responseText },
            ]);
            setIsLoading(false);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
            ]);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-950 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "p-3 rounded-lg max-w-[80%]",
                            msg.role === "user"
                                ? "ml-auto bg-[var(--color-midnight-blue)] text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        )}
                    >
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-[80%]">
                        <SadaqaPulse />
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Ramadan charity..."
                    className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-ramadan-gold)]"
                />
                <button
                    type="submit"
                    className="p-2 bg-[var(--color-ramadan-gold)] text-white rounded-md hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}
