import { createContext, useContext, useState } from 'react';

const ModeContext = createContext(null);

export const ModeProvider = ({ children }) => {
    // Mode State: null | 'athletes' | 'esports'
    // Intentionally volatile: resets on refresh
    const [mode, setMode] = useState(null);

    const selectMode = (newMode) => {
        if (newMode === 'athletes' || newMode === 'esports') {
            setMode(newMode);
        } else {
            console.warn('Invalid mode selected:', newMode);
        }
    };

    const clearMode = () => {
        setMode(null);
    };

    return (
        <ModeContext.Provider value={{ mode, selectMode, clearMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }
    return context;
};
