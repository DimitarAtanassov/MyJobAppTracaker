import React from 'react';
import axios from 'axios';
import JobApp from '../components/JobApp'; // Assuming you have the JobApp component defined
import NewJobAppPage from './NewJobAppPage'; // Assuming you have the NewJobAppPage component defined

class JobAppPage extends React.Component {
  state = {
    jobApplications: [],
    showNewJobAppPage: false // State to control the visibility of NewJobAppPage
  };

  componentDidMount() {
    this.fetchJobApplications();
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

  toggleNewJobAppPage = () => {
    this.setState(prevState => ({
      showNewJobAppPage: !prevState.showNewJobAppPage
    }));
  };

  render() {
    return (
      <div>
        <h2>Job Application Page</h2>
        <p>Click the button below to fetch job applications:</p>
        <button onClick={this.fetchJobApplications}>Fetch Job Applications</button>
        {this.state.jobApplications.map(job => (
          <JobApp key={job._id} job={job} />
        ))}
        
        {/* Conditionally render NewJobAppPage */}
        {this.state.showNewJobAppPage && <NewJobAppPage fetchJobApplications={this.fetchJobApplications} />}
        
        {/* Add a button to toggle NewJobAppPage visibility */}
        <button onClick={this.toggleNewJobAppPage}>Add New Job App</button>
      </div>
    );
  }
}

export default JobAppPage;
