// LoginRegisterButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRegisterButton = ({ dest, buttonLabel }) => {
    const navigate = useNavigate();

    const routeTo = () => {
        navigate(dest); 
    }

    return (
        <button color="Primary" className="px-4" onClick={routeTo}> 
            {buttonLabel}
        </button>
    );
}

export default LoginRegisterButton;