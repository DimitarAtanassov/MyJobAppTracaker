import React from 'react';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
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
