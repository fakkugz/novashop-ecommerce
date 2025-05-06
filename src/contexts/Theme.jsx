import { createTheme } from '@mui/material/styles';
import background from '../assets/images/codioful-713087444.webp';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      light: '#FF5121',
      main: '#FF4511',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Poppins", "Roboto", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-primary': '#1976d2',
          '--color-secondary': '#FF4511',
          '--color-secondary-light': '#FF5121',
        },
        body: {
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default Theme;
