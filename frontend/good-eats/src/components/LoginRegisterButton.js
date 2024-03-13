// LoginRegisterButton.js
/* React Component, Button to redirect a User between SignUp and Login Pages*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
const LoginRegisterButton = ({ dest, buttonLabel }) => {
    const navigate = useNavigate();

    const routeTo = () => {
        navigate(dest); 
    }

    return (
        <Button color="primary" variant="contained" onClick={routeTo}> 
            {buttonLabel}
        </Button>
    );
}

export default LoginRegisterButton;