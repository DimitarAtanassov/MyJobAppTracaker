import React from 'react';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
/*
  Todo:
    Need to look into how to setup page routing 
    Need to create landing page with two options Login and Sign Up

*/
function App() {
  return (
   <>
        <h1>User Sign-Up</h1>
        <SignupPage />
        <hr/>
        <h1>User Login</h1>
        <LoginPage />
    </>
  );
}

export default App;
