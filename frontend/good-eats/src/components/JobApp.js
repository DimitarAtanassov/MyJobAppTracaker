import React, { useState } from 'react';

const JobApp = ({job}) => {
    const [status,setStatus] = useState('pending');
    
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
      };

    const containerStyle = {
        backgroundColor: status === 'pending' ? 'yellow' : status === 'accepted' ? 'green' : 'red',
        padding: '10px',
        marginBottom: '10px'
    };

    return (
        <div style={containerStyle}>
            <div>
                <strong>{job.company}</strong>: {job.title}
                <a href={job.link} target="_blank" rel="noopener noreferrer">
                    &#8594;
                </a>
            </div>

            <div>
                Status: {status}
                <select value={status} onChange={handleStatusChange}>
                    <option value='pending'>Pending</option>
                    <option value='accepted'>Accepted</option>
                    <option value='rejected'>Rejected</option>
                </select>
            </div>
        </div>
        
    );
};

export default JobApp;