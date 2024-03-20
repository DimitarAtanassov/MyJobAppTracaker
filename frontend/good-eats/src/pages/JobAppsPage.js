// JobAppsPage.js
/* Class Component: Displays all the active job apps of a user.*/

// Imports
//===============================================================
import React from 'react';
import axios from 'axios';
import JobApp from '../components/JobApp'; // Assuming you have the JobApp component defined
import NewJobAppPage from './NewJobAppPage'; // Assuming you have the NewJobAppPage component defined
import SignOutButton from '../components/SignOutButton';
import MiniWindow from '../components/MiniWindow';
import JobAppChart from '../components/JobAppChart';
import { Typography, Button, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { ObjectId } from 'bson';
import Chip from '@mui/material/Chip';
import { getJobApplications } from '../utils/apiService';

// JobAppPage
//===============================================================
class JobAppPage extends React.Component {
  state = {
    jobApplications: [],
    filteredJobApplications: [], // State to store filtered job applications
    showNewJobAppPage: false, // State to control the visibility of NewJobAppPage
    showPieChart: false, // Add state variable to control visibility of PieChart
    userName: '', // State to store the user name
    userId: '', // State to store the user ID
    counts: {
      accepted: 0,
      rejected: 0,
      pending: 0
    },
    selectedStatusFilter: "all" // State to filter job apps displayed by status
    
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

handleStatusFilterChange = (event) => {
  const selectedStatus = event.target.value;
  this.setState({selectedStatusFilter: selectedStatus}, () => {
    this.filterJobApplications();
  });
};

filterJobApplications = () => {
  const {jobApplications,selectedStatusFilter} = this.state;
  let filteredJobApplications = []
  if (selectedStatusFilter === "all")
  {
    filteredJobApplications = jobApplications
  }
  else{
    filteredJobApplications = jobApplications.filter(job => job.status === selectedStatusFilter );
  }

  this.setState({filteredJobApplications})
}
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
      }
      const response = await getJobApplications();
      const {jobApplications, counts} = response.data;
      console.log(counts);
      this.setState({jobApplications,counts});
      console.log('Job applications fetched successfully');
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };

  togglePieChart = () => {
    this.setState(prevState => ({
      showPieChart: !prevState.showPieChart
    }));
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
    const {  jobApplications, showNewJobAppPage, counts, showPieChart, selectedStatusFilter,filteredJobApplications } = this.state; 
    const applicationsToRender = selectedStatusFilter === 'all' ? jobApplications : filteredJobApplications;
    return (
      <Box maxWidth="800px" margin="auto">
        {/* Container for Job Applications header */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          {/* Container for Job Applications */}
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="h4" align="center">
              Job Applications
            </Typography>
          </Box>
        </Box>
  
        {/* Sign out button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <SignOutButton />
        </Box>
  
        {/* Total applications counter */}
  
        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleNewJobAppPage}
            >
              Add New Job Application
            </Button>

          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={this.togglePieChart}
            >
              Generate Chart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.fetchJobApplications}
              ml={2}
            >
              Refresh List
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Chip label={`Total Applications: ${jobApplications.length}`} color="secondary" variant="outlined" size="medium" />
        </Box>
      
        {/* Status counters using Chip components */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Chip label={`Accepted: ${counts.accepted}`} color="success" variant="outlined" size="small" />
          <Chip label={`Rejected: ${counts.rejected}`} color="error" variant="outlined" size="small" />
          <Chip label={`Pending: ${counts.pending}`} color="warning" variant="outlined" size="small" />
        </Box>
        {/* New Job Application Page */}
        {showNewJobAppPage && (
          <NewJobAppPage fetchJobApplications={this.fetchJobApplications} />
        )}

        <Box display="flex" justifyContent="center" alignItems="center">
          <FormControl>
            <InputLabel id="status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={selectedStatusFilter}
              onChange={this.handleStatusFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Job Applications */}
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        {applicationsToRender.map((job) => (
          <JobApp key={job._id} job={job} onStatusChange={this.handleJobAppChange}/>
        ))}
      </Box>
  
        {/* Pie Chart */}
        {showPieChart && (
          <MiniWindow open={showPieChart} onClose={this.togglePieChart}>
            <JobAppChart jobApplications={counts} />
          </MiniWindow>
        )}
      </Box>
    );
  }
  
  
  
  
}

export default JobAppPage;