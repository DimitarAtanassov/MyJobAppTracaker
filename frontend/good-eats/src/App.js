// App.js
/*
  Main Entry point for our React App. Sets up application routing and renders different pages based on the route.
*/

// Imports
//===============================================================
import React from 'react';
import SignUpForm from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import JobAppsPage from './pages/JobAppsPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
      
                  <Routes>
                          <Route path="/signup" element={<SignUpForm />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/jobapps" element={<JobAppsPage/>} />
                          <Route path="*" element={<LoginPage />} />
                  </Routes>
            
      </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
