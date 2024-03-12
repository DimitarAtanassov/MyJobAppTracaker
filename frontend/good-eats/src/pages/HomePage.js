import React, { useState, useEffect } from 'react';
import JobApplicationsPage from './JobAppPage';

const HomePage = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    return (
        <div>
            <h2>JWT Token</h2>
            {token ? (
                <pre>{token}</pre>
            ) : (
                <p>No token found in localStorage</p>
            )}
            <JobApplicationsPage />
        </div>
    );
};

export default HomePage;
