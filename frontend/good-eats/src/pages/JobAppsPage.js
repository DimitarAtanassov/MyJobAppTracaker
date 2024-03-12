import React from 'react';
import axios from 'axios';
import JobApp from '../components/JobApp'; // Assuming you have the JobApp component defined
import NewJobAppPage from './NewJobAppPage'; // Assuming you have the NewJobAppPage component defined

class JobAppPage extends React.Component {
  state = {
    jobApplications: [],
    showNewJobAppPage: false, // State to control the visibility of NewJobAppPage
    userName: '', // State to store the user name
    userId: '' // State to store the user ID
  };

  componentDidMount() {
    this.fetchJobApplications();
    this.loadUserData();
  }

  fetchJobApplications = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you stored the token in local storage
      const response = await axios.get('https://crud-api-c680d4c27735.herokuapp.com/api/jobapps', {
        headers: {
          'Authorization': `Bearer ${token}` // Send the JWT token in the request headers
        }
      });
      const jobApplications = response.data.jobApplications;
      this.setState({ jobApplications });
      console.log('Job applications fetched successfully');
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  loadUserData = () => {
    const userName = localStorage.getItem('username'); // Retrieve the user name from local storage
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    this.setState({ userName, userId });
  };

  toggleNewJobAppPage = () => {
    this.setState(prevState => ({
      showNewJobAppPage: !prevState.showNewJobAppPage
    }));
  };

  render() {
    return (
      <div>
        <header>
          <h1>Job Application Page</h1>
          <h2>Logged in as: {this.state.userName} </h2>
          <h3>User ID: {this.state.userId}</h3>
          
        </header>
        <button onClick={this.toggleNewJobAppPage}>Add New Job App</button>
        <button onClick={this.fetchJobApplications}>Refresh Job Apps List</button>
        {this.state.showNewJobAppPage && <NewJobAppPage fetchJobApplications={this.fetchJobApplications} />}
        <p>Total Applications: {this.state.jobApplications.length}</p>
        <p>Current Job Apps:</p>
        {this.state.jobApplications.map(job => (
          <JobApp key={job._id} job={job} />
        ))}
        
        
        
        
        {/* Add a button to toggle NewJobAppPage visibility */}
      </div>
    );
  }
}

export default JobAppPage;
