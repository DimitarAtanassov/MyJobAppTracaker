// JobAppPage.js
import React from 'react';
import NewJobAppForm from './NewJobAppPage'; // Import the form component

const JobAppPage = () => {
  const handleSubmit = (jobAppData) => {
    const token = localStorage.getItem('token');

    // Check if token exists in localStorage
    if (token) {
      // Token exists, you can use it for authentication or other purposes
      console.log('Token found:', token);
    } else {
      // Token doesn't exist in localStorage
      console.log('Token not found');
    }
    // Here you can send the job application data to your backend
    // using fetch or axios
    fetch('https://crud-api-c680d4c27735.herokuapp.com/api/users/jobapps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optionally, you can include authentication headers here
        // to authenticate the request
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobAppData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create job application');
      }
      // Handle successful submission, such as showing a success message
      alert('Job application created successfully');
    })
    .catch(error => {
      // Handle error, such as showing an error message
      console.error('Error creating job application:', error.message);
      alert('Failed to create job application. Please try again.');
    });
  };

  return (
    <div>
      <h1>New Job Application</h1>
      <NewJobAppForm onSubmit={handleSubmit} />
    </div>
  );
};

export default JobAppPage;
