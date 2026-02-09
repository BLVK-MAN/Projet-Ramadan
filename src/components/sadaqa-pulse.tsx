"use client";

import { motion } from "framer-motion";

export function SadaqaPulse() {
    return (
        <div className="flex items-center justify-center space-x-2">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-[var(--color-ramadan-gold)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
            ))}
        </div>
    );
}
