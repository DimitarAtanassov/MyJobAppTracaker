import React from 'react';
import SignUpForm from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import JobAppPage from './pages/JobAppPage';
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

    <Router>
    
                <Routes>
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/jobapps" element={<JobAppPage/>} />
                        <Route path="*" element={<LoginPage />} />
                </Routes>
          
    </Router>
    </>
  );
}

export default App;
