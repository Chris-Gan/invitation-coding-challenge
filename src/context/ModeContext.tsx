import { Theme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { darkTheme, lightTheme } from 'constant/customisedTheme';
import { ColorMode } from 'interfaces/colorContext';
import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback, useEffect } from 'react';

export const updateColorModeContext = createContext<() => void>({} as () => void);

export const useColorModeUpdate = () => useContext(updateColorModeContext);
type Props = {
    children: ReactNode;
};
export const toggleColorModeContext = ({ children }: Props) => {
    // detect whether the browser preference is set to dark mode or not
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // detect whether the users visited our website & had chosen a theme before or not
    const localStorageMode = localStorage.getItem('mode') as ColorMode;
    const initialMode = localStorageMode || (prefersDarkMode ? 'dark' : 'light');
    const [mode, setMode] = useState<ColorMode>(initialMode);
    const updateColorMode = useCallback(() => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }, []);

    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    return (
        <updateColorModeContext.Provider value={updateColorMode}>
            <ThemeProvider theme={responsiveFontSizes(theme) as Theme}>{children}</ThemeProvider>
        </updateColorModeContext.Provider>
    );
};
