// jobApp.js
/*
  React Component to diplay a users active Job Applications, has frontend logic to update status
*/

// Imports
//===============================================================
import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const JobApp = ({ job }) => {
  const [status, setStatus] = useState(job.status); // Tracks state of job application status

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://crud-api-c680d4c27735.herokuapp.com/api/jobapps/${job._id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Status updated successfully', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle error, such as showing an error message
      alert('Failed to update status. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: status === 'pending' ? '#FFDA43' : status === 'accepted' ? '#228B22' : '#FF0000',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '20px',
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Typography variant="body1">
          <strong>{job.company}</strong>: {job.title}
          <Link href={job.link} target="_blank" rel="noopener noreferrer">
          ➡️
          </Link>
        </Typography>
      </div>
      <div>
        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={handleStatusChange}
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Box>
  );
};

export default JobApp;



// import React, { useState } from 'react';
// import axios from 'axios';

// const JobApp = ({ job }) => {
//   const [status, setStatus] = useState(job.status);

//   const handleStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     setStatus(newStatus);
//     try {
//       const token = localStorage.getItem('token'); // Assuming you stored the token in local storage
//       const response = await axios.put(`https://crud-api-c680d4c27735.herokuapp.com/api/jobapps/${job._id}/status`, { status: newStatus }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log('Status updated successfully', response.data);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       // Handle error, such as showing an error message
//       alert('Failed to update status. Please try again.');
//     }
//   };

//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between', // To push the status dropdown to the far right
//     alignItems: 'center', // To vertically center the content
//     backgroundColor: status === 'pending' ? 'yellow' : status === 'accepted' ? 'green' : 'red',
//     padding: '10px',
//     marginBottom: '10px'
//   };
  

//   return (
//     <div style={containerStyle}>
//       <div>
//         <strong>{job.company}</strong>: {job.title}
//         <a href={job.link} target="_blank" rel="noopener noreferrer">
//           &#8594;
//         </a>
//       </div>

//       <div>
//         Status: 
//         <select value={status} onChange={handleStatusChange}>
//           <option value='pending'>Pending</option>
//           <option value='accepted'>Accepted</option>
//           <option value='rejected'>Rejected</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default JobApp;

