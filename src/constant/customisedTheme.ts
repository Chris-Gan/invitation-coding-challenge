import { createTheme } from '@mui/material';
import { grey, pink, red } from '@mui/material/colors';
import GoudyOldStyle from '../fonts/GoudyOldStyle/GOUDOS.ttf';

const baseTheme = createTheme({
    typography: {
        allVariants: { fontFamily: 'Goudy Old Style' },
    },

    palette: {
        secondary: {
            light: '#B7C4CF',
            dark: '#000000',
            main: 'rgba(0, 0, 0, 0.87)',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
                font-family: 'Goudy Old Style;
                font-style: normal;
                font-weight: 400;
                src: url(${GoudyOldStyle}) format('truetype)
            },
            `,
        },
    },
});

export const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'light',
        secondary: { main: '#fff' },
        text: {
            primary: grey[900],
            secondary: grey[800],
        },
    },
    components: {
        ...baseTheme.components,
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    '.MuiSnackbarContent-root': {
                        backgroundColor: red[700],
                    },
                },
            },
        },
    },
});
export const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'dark',
        divider: '#fff',
        primary: { main: '#fff' },
        secondary: { main: '#fff' },
        background: {
            default: grey[500],
            paper: grey[900],
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
    },
    components: {
        ...baseTheme.components,
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    '.MuiSnackbarContent-root': {
                        backgroundColor: red[900],
                        color: '#fff',
                    },
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&.MuiFormHelperText-root.Mui-error': { color: pink[300] },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.MuiFormLabel-root.Mui-error': { color: pink[300] },
                },
            },
        },
    },
});
