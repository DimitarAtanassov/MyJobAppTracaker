// JobAppsPage.js
/* Class Component: Displays all the active job apps of a user.*/

// Imports
//===============================================================
import React from 'react';
import axios from 'axios';
import JobApp from '../components/JobApp'; // Assuming you have the JobApp component defined
import NewJobAppPage from './NewJobAppPage'; // Assuming you have the NewJobAppPage component defined
import SignOutButton from '../components/SignOutButton';
import { Typography, Button, Box } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { ObjectId } from 'bson';
// JobAppPage
//===============================================================
class JobAppPage extends React.Component {
  state = {
    jobApplications: [],
    showNewJobAppPage: false, // State to control the visibility of NewJobAppPage
    userName: '', // State to store the user name
    userId: '', // State to store the user ID
    counts: {
      accepted: 0,
      rejected: 0,
      pending: 0
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

  componentDidMount() {
    this.fetchJobApplications();
    this.loadUserData();
  }

  handleJobAppChange = async () => {
    try {
      await this.fetchJobApplications();
      console.log('Job applications refreshed successfully');
    } catch (error) {
      console.error('Error refreshing job applications:', error);
    }
  }

  fetchJobApplications = async () => {
    try {
      let token = localStorage.getItem('token'); // Assuming you stored the token in local storage
      if(this.isTokenExpired(token)){
        const refreshedToken = await this.refreshToken();
        if(!refreshedToken){
          console.log('Failed to refresh token or token is not available. Redirect to login page or handle accordingly.');
          return;
        }
        token = localStorage.getItem('token');
      }
      const response = await axios.get('https://crud-api-c680d4c27735.herokuapp.com/api/jobapps', {
        headers: {
          'Authorization': `Bearer ${token}` // Send the JWT token in the request headers
        }
      });
      const {jobApplications, counts} = response.data;
      console.log(counts);
      this.setState({jobApplications,counts});
      console.log('Job applications fetched successfully');
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  loadUserData = () => {
    const userName = localStorage.getItem('username'); // Retrieve the user name from local storage
    let userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    userId = new ObjectId(userId);
    console.log(typeof userId);
    this.setState({ userName, userId });
  };

  toggleNewJobAppPage = () => {
    this.setState(prevState => ({
      showNewJobAppPage: !prevState.showNewJobAppPage
    }));
  };

  // render() {
  //   return (
  //     <div>
  //       <header>
  //         <h1>Job Application Page</h1>
  //         <h2>Logged in as: {this.state.userName} </h2> <SignOutButton />
  //         <h3>User ID: {this.state.userId}</h3>
          
  //       </header>
  //       <button onClick={this.toggleNewJobAppPage}>Add New Job App</button>
  //       <button onClick={this.fetchJobApplications}>Refresh Job Apps List</button>
  //       {this.state.showNewJobAppPage && <NewJobAppPage fetchJobApplications={this.fetchJobApplications} />}
  //       <p>Total Applications: {this.state.jobApplications.length}</p>
  //       <p>Current Job Apps:</p>
  //       {this.state.jobApplications.map(job => (
  //         <JobApp key={job._id} job={job} />
  //       ))}
        
        
        
        
  //       {/* Add a button to toggle NewJobAppPage visibility */}
  //     </div>
  //   );
  // }
  render() {
    const { userName, jobApplications, showNewJobAppPage, counts } = this.state; 
    return (
      <Box textAlign="center" maxWidth="800px" margin="auto">
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Job Applications
          </Typography>
          <Box ml="auto">
            <Typography variant="body1">
              Logged in as: {this.state.userName}
            </Typography>
            <SignOutButton />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="body2" mr={1}>
            Accepted Count: {this.state.counts.accepted}
          </Typography>
          <Typography variant="body2" mr={1}>
            Rejected Count: {this.state.counts.rejected}
          </Typography>
          <Typography variant="body2">
            Pending Count: {this.state.counts.pending}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box></Box>
        </Box>
  
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleNewJobAppPage}
            >
              Add New Job App
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.fetchJobApplications}
              ml={1}
            >
              Refresh Job Apps List
            </Button>
          </Box>
  
          {this.state.showNewJobAppPage && (
            <NewJobAppPage fetchJobApplications={this.fetchJobApplications} />
          )}
  
          <Typography variant="body2" mb={1}>
            Total Applications: {this.state.jobApplications.length}
          </Typography>
  
          {this.state.jobApplications.map((job) => (
            <JobApp key={job._id} job={job} onStatusChange={this.handleJobAppChange}/>
          ))}
        </Box>
      </Box>
    );
  }
}

export default JobAppPage;