import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5634;',
            light: '#f75e25',
            dark: '#f34723',
            contrastText: '#121212',
        },
        secondary: {
           main: '#000000',
        },
        // custom: {
        //   main: '#f44336',
        // },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.75em',
                    padding: '1em 2em',
                    margin: '0',
                    border: '1px solid #DCDCDC',
                    transition: '240ms ease-out',
                    textTransform: 'none',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        //backgroundColor: '#FF5634',
                        //color: '#FFF'
                    }
                },
            },
        },
    },
},
);

export default theme;