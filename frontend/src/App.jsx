import React from 'react';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import { purple } from '@mui/material/colors';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const theme = createTheme({
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
  return (
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
