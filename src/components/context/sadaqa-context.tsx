"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SadaqaContextType = {
    activeFamily: string | null;
    setActiveFamily: (family: string | null) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
};

const SadaqaContext = createContext<SadaqaContextType | undefined>(undefined);

export function SadaqaProvider({ children }: { children: ReactNode }) {
    const [activeFamily, setActiveFamily] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SadaqaContext.Provider value={{ activeFamily, setActiveFamily, isLoading, setIsLoading }}>
            {children}
        </SadaqaContext.Provider>
    );
}

export function useSadaqa() {
    const context = useContext(SadaqaContext);
    if (context === undefined) {
        throw new Error("useSadaqa must be used within a SadaqaProvider");
    }
    return context;
}
