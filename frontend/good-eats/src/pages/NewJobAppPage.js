// NewJobAppPage.js
/*
  Used to display the JobAppForm used to create a job app
*/
import React from 'react';
import axios from 'axios';
import JobAppForm from '../components/JobAppForm'; // Assuming you have the NewJobAppForm component defined
import {jwtDecode} from 'jwt-decode';
// NewJobAppPage
//===============================================================
class NewJobAppPage extends React.Component {

  refreshToken = async () => {
    try {
        const response = await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/users/refresh-token', {}, {
            withCredentials: true // Send cookies along with the request
        });
        const data = response.data;
  
        if (response.status === 200) {
            localStorage.setItem('token', data.accessToken);
            return true; // Token refresh successful
        } else {
            console.error("Token refresh failed: ", data.message);
            return false; // Token refresh failed
        }
    } catch (error) {
        console.error("Error refreshing token: ", error.message);
        return false; // Token refresh error
    }
  };
  isTokenExpired = () => {
    const token = localStorage.getItem('token');
    console.log("Token", token);
    if(!token) {
        return true;
    }
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};
  handleSubmit = async (jobAppData) => {
    try {
      if(this.isTokenExpired()){
        const refreshed = await this.refreshToken();
        if(!refreshed)
        {
          console.log('Failed to refresh token or token is not available. Redirect to login page or handle accordingly.');
          return;
        }
      }
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
