'use client';

import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light Mode (Professional High Contrast)
                primary: {
                    main: '#2563EB', // Strong Royal Blue
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#4B5563', // Slate Gray
                    contrastText: '#FFFFFF',
                },
                background: {
                    default: '#F8FAF8', // Clean Soft White
                    paper: '#FFFFFF',
                },
                text: {
                    primary: '#000000', // Pitch Black for readability
                    secondary: '#2563EB',
                },
                action: {
                    disabledBackground: 'rgba(0, 0, 0, 0.08)',
                    disabled: 'rgba(0, 0, 0, 0.26)',
                },
            }
            : {
                // Dark Mode (Retro Neon)
                primary: {
                    main: '#FAEC3B', // Brand Yellow
                    contrastText: '#001E1E',
                },
                secondary: {
                    main: '#ECECEC', // Light Silver
                    contrastText: '#001E1E',
                },
                background: {
                    default: '#3C003C', // Deep Purple
                    paper: 'rgba(0, 0, 0, 0.6)',
                },
                text: {
                    primary: '#FAEC3B', // Locked to Yellow for consistency
                    secondary: '#FAEC3B',
                },
                action: {
                    disabledBackground: 'rgba(236, 236, 236, 0.1)',
                    disabled: 'rgba(236, 236, 236, 0.3)',
                },
            }),
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        h1: { fontSize: '2rem', color: mode === 'light' ? '#000000' : '#FAEC3B', fontFamily: '"Press Start 2P", cursive' },
        h2: { fontSize: '1.5rem', color: mode === 'light' ? '#000000' : '#FAEC3B', fontFamily: '"Press Start 2P", cursive' },
        h3: { fontSize: '1.2rem', color: mode === 'light' ? '#000000' : '#FAEC3B' },
        button: { textTransform: 'uppercase', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    boxShadow: mode === 'light' ? '4px 4px 0px rgba(0,0,0,0.1)' : '4px 4px 0px rgba(0,0,0,0.5)',
                    '&:active': {
                        transform: 'translate(2px, 2px)',
                        boxShadow: mode === 'light' ? '2px 2px 0px rgba(0,0,0,0.1)' : '2px 2px 0px rgba(0,0,0,0.5)',
                    },
                },
                containedPrimary: {
                    borderColor: mode === 'light' ? '#2563EB' : '#FAEC3B',
                    color: mode === 'light' ? '#FFFFFF' : '#001E1E',
                    backgroundColor: mode === 'light' ? '#2563EB' : '#FAEC3B',
                    '&:hover': {
                        backgroundColor: mode === 'light' ? '#1d4ed8' : '#e6d52b',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: mode === 'light' ? '#FFFFFF' : '#3C003C',
                    border: `4px solid ${mode === 'light' ? '#000000' : '#FAEC3B'}`,
                    borderRadius: 0,
                    boxShadow: '10px 10px 0px rgba(0,0,0,0.5)',
                },
            },
        },
    },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
export default getTheme('dark'); // Default export for backwards compat if needed
