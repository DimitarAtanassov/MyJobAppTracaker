import React from 'react';
import SignUpForm from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import JobAppsPage from './pages/JobAppsPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";
import HomePage from './pages/HomePage';
/*
  Todo:
    Need to look into how to setup page routing 
    Need to create landing page with two options Login and Sign Up

*/
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
