'use client'

import { createContext, useState, useMemo, useEffect, useContext } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { getTheme } from '@/lib/theme'

export const ColorModeContext = createContext({ toggleColorMode: () => { }, mode: 'dark' });
export const useColorMode = () => useContext(ColorModeContext);

export default function Providers({ children }) {
    const [mode, setMode] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode) setMode(savedMode);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute('data-theme', mode);
        }
    }, [mode, mounted]);

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => {
                const newMode = prevMode === 'light' ? 'dark' : 'light';
                localStorage.setItem('colorMode', newMode);
                return newMode;
            });
        },
        mode,
    }), [mode]);

    // Prevent hydration mismatch by rendering default theme first or empty until mounted
    // But better to just render 'dark' initially and switch client side to avoid layout shift if possible
    // For now simple approach:
    const theme = useMemo(() => getTheme(mode), [mode]);

    // To avoid hydration mismatch on the theme class/style, we just render. 
    // Mui handles style injection.

    return (
        <AppRouterCacheProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AppRouterCacheProvider>
    )
}
