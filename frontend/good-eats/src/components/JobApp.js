import React, { useState } from 'react';
import axios from 'axios';

const JobApp = ({ job }) => {
  const [status, setStatus] = useState(job.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const token = localStorage.getItem('token'); // Assuming you stored the token in local storage
      const response = await axios.put(`https://crud-api-c680d4c27735.herokuapp.com/api/jobapps/${job._id}/status`, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Status updated successfully', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error, such as showing an error message
      alert('Failed to update status. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', // To push the status dropdown to the far right
    alignItems: 'center', // To vertically center the content
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
        Status: 
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
