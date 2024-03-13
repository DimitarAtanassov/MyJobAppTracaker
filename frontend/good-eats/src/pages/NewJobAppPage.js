// NewJobAppPage.js
/*
  Used to display the JobAppForm used to create a job app
*/
import React from 'react';
import axios from 'axios';
import JobAppForm from '../components/JobAppForm'; // Assuming you have the NewJobAppForm component defined

// NewJobAppPage
//===============================================================
class NewJobAppPage extends React.Component {
  handleSubmit = async (jobAppData) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you stored the token in local storage
      await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/users/jobapps', jobAppData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Job application created successfully');
      // Refetch the user's job applications to display the newly added job app
      this.props.fetchJobApplications(); // Accessing fetchJobApplications from props
    } catch (error) {
      console.error('Error creating job application:', error);
      // Handle error, such as showing an error message
      alert('Failed to create job application. Please try again.');
    }
  };

  render() {
    return (
      <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
        <h3>Add Job Application</h3>
        <JobAppForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default NewJobAppPage;
