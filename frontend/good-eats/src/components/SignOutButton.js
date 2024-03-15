import React from 'react';

const SignOutButton = () => {
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        window.location.href = '/login';
    }

    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    )
};

export default SignOutButton;