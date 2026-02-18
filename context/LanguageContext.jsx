'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('id');

    const toggleLang = useCallback(() => {
        setLang((prev) => (prev === 'id' ? 'en' : 'id'));
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLang must be used within LanguageProvider');
    return context;
}
