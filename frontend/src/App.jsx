import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import { useCookies } from 'react-cookie';

const theme = createTheme({
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#4f1150',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function App() {
  const [cookies, setCookie] = useCookies(['user']);

  console.log(cookies);


  if(cookies && cookies.user && cookies.user.isLogin && new Date() <= new Date(cookies.user.expires)){
    console.log(new Date() <= new Date(cookies.user.expires));
    console.log(cookies.user.isLogin);
    return (
      <ThemeProvider theme={theme}>
        <Home/>
      </ThemeProvider>
      );
  }
  else{
    return(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
    );
  }
}

export default App;
