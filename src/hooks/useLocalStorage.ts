import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue?: T) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue ?? null;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore write errors (e.g., private mode)
        }
    }, [key, value]);

    return [value, setValue] as const;
}
