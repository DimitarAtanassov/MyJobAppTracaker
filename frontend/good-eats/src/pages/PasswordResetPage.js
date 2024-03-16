import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { validatePassword } from '../utils/validators';
import axios from 'axios';

const PasswordResetPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Password and Confirm Password are required');
      return;
    }
    const passwordErrors = validatePassword(password, confirmPassword);
    if(Object.keys(passwordErrors).length > 0) {
      setError(Object.values(passwordErrors).join('\n'));
      return;
    }
    

    try {
        // Send POST request to reset password
        const response = await axios.post(`https://crud-api-c680d4c27735.herokuapp.com/reset-password`, {
          token,
          newPassword: password
        });
        console.log(response.data); // Handle success
        alert('Password Changed Successfully.');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error resetting password:', error);
        setError('Failed to reset password');
      }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <Box mb={2}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        {error && <Box mb={2} color="error">{error}</Box>}
        <Box mb={2}>
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default PasswordResetPage;
