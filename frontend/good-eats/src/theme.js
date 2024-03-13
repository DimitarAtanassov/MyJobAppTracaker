// theme.js
/*
  Theme Config file for Material-UI 
*/
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      error: {
        main: '#f44336',
      },
      warning: {
        main: '#ff9800',
      },
      success: {
        main: '#4caf50',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    // Add more theme configurations as needed
  });
  
  export default theme;