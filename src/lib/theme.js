'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FAEC3B', // Yellow
            contrastText: '#001E1E', // Dark Teal
        },
        secondary: {
            main: '#ECECEC', // Light Gray
            contrastText: '#001E1E',
        },
        error: {
            main: '#D2003A', // Red
        },
        background: {
            default: '#3C003C', // Dark Purple
            paper: 'rgba(0, 0, 0, 0.3)', // Retro transparent dark
        },
        text: {
            primary: '#ECECEC', // Light Gray
            secondary: '#FAEC3B', // Yellow
        },
        action: {
            disabledBackground: 'rgba(236, 236, 236, 0.1)',
            disabled: 'rgba(236, 236, 236, 0.3)',
        },
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        h1: { fontSize: '2rem', color: '#FAEC3B', fontFamily: '"Press Start 2P", cursive' },
        h2: { fontSize: '1.5rem', color: '#FAEC3B', fontFamily: '"Press Start 2P", cursive' },
        h3: { fontSize: '1.2rem', color: '#ECECEC' },
        button: { textTransform: 'uppercase', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0, // Square retro buttons
                    borderWidth: 2,
                    borderStyle: 'solid',
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                    '&:active': {
                        transform: 'translate(2px, 2px)',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
                    },
                },
                containedPrimary: {
                    borderColor: '#FAEC3B', // Yellow border
                    color: '#001E1E',
                    '&:hover': {
                        backgroundColor: '#dico3b', // Slightly darker yellow
                    },
                },
                containedSecondary: {
                    borderColor: '#ECECEC', // Gray border
                    backgroundColor: 'transparent',
                    color: '#ECECEC',
                    '&:hover': {
                        backgroundColor: 'rgba(236, 236, 236, 0.1)',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#3C003C',
                    border: '4px solid #ECECEC',
                    borderRadius: 0,
                    boxShadow: '10px 10px 0px rgba(0,0,0,0.5)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        '& fieldset': {
                            borderColor: '#ECECEC',
                            borderWidth: 2,
                        },
                        '&:hover fieldset': {
                            borderColor: '#FAEC3B',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#FAEC3B',
                        },
                        '& input': {
                            color: '#ECECEC',
                        }
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ECECEC',
                        fontFamily: '"Press Start 2P", cursive', // Ensure label uses retro font
                        fontSize: '0.7rem',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#FAEC3B',
                    }
                },
            },
        },
    },
});

export default theme;
