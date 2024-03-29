// SignupPage.js
/* Class Component: The Sign Up Page for our web app*/

// Imports
//===============================================================
import React, { Component } from 'react';
import {TextField, Button} from '@mui/material';
import axios from 'axios';
import LoginRegisterButton from '../components/LoginRegisterButton';
import {validateUsername, validatePassword,validateEmail} from '../utils/validators';
import { signUpService } from '../utils/apiService';
// SignUpForm
//===============================================================
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }
  
  // Called everytime an textfield is updated and validates the current input
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      let fieldErrors = {};
      if (name === 'password' || name === 'confirmPassword') {
        fieldErrors = validatePassword(this.state.password, this.state.confirmPassword);
      }
      if (name === 'email') {
        fieldErrors = validateEmail(this.state.email);
      }
      if (name === 'username') {
        fieldErrors = validateUsername(this.state.username);
      }
      const hasErrors = Object.keys(fieldErrors).length > 0;
          // Update the errors state only if there are errors for the current field
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: hasErrors ? fieldErrors[name] : '', // Set the error message or empty string
      },
    }));
    });
  };
  // Frontend: Validation Logic
  //===============================================================
  // validateUsername = () => {
  //   const { username } = this.state;
  //   const errors = {};

  //   if (username.length < 2) {
  //     errors.username = 'Username must be longer than 2 characters';
  //   }
  //   else if (/\s/.test(username)) {
  //     errors.username = 'Username cannot contain spaces';
  //   } 
  //   else {
  //     delete errors.username;
  //   }

  //   this.setState({errors});
    
  // }
  // validatePassword = () => {
  //   const { password, confirmPassword } = this.state;
  //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  //   const errors = {};

  //   if (!passwordRegex.test(password)) {
  //     errors.password = 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and at least 6 characters';
  //   } else {
  //     delete errors.password;
  //   }

  //   if (password !== confirmPassword) {
  //     errors.confirmPassword = 'Passwords do not match';
  //   } else {
  //     delete errors.confirmPassword;
  //   }

  //   this.setState({ errors });
  // };

  // validateEmail = () => {
  //   const { email } = this.state;
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const errors = {};

  //   if (!emailRegex.test(email)) {
  //     errors.email = 'Invalid Email Address';
  //   } else {
  //     delete errors.email;
  //   }

  //   this.setState({ errors });
  // };


  // Handles SignUp form submission
  handleSubmit = async (e) => { 
    e.preventDefault(); // preventing default form behavior

    const { username, email, password, confirmPassword } = this.state;

    // Check if any field is empty
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm password';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Input Validation
    const usernameErrors = validateUsername(username);
    const passwordErrors = validatePassword(password,confirmPassword);
    const emailErrors = validateEmail(email);


    if (Object.keys(usernameErrors).length > 0 || Object.keys(passwordErrors).length > 0 || Object.keys(emailErrors).length > 0) {
      this.setState({ errors: { ...usernameErrors, ...passwordErrors, ...emailErrors } });
      return;
    }

    try {

      // Make POST request to your API endpoint
      await signUpService(username,email,password);

      alert('User signed up successfully, check your email for the verification link.');
      
      // Reset form fields
      this.setState({ username: '', email: '', password: '', confirmPassword: '', errors: {} });
      
      window.location.href = '/login';
    } 
    catch (error) 
    {
      if (error.message === "Username already exists") {
        this.setState({errors: {username: error.message}});
      }
      else if (error.message === 'Email already exists') {
        this.setState({errors: {email: error.message}});
      }
      else{
        this.setState({ errors: { apiError: error.message } });
      }
    }
  };

  // render() {
  //   const { username, email, password, confirmPassword, errors } = this.state;
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmit}>
  //         <TextField
  //           label="Username"
  //           variant="outlined"
  //           type="text"
  //           name="username"
  //           value={username}
  //           onChange={this.handleChange}
  //           error={!!errors.username}
  //           helperText={errors.username}
  //         />
  //         {errors.username && <div>{errors.username}</div>}
  //         <TextField
  //           label="Email"
  //           variant="outlined"
  //           type="text"
  //           name="email"
  //           value={email}
  //           onChange={this.handleChange}
  //           error={!!errors.email}
  //           helperText={errors.email}
  //         />
  //         {errors.email && <div>{errors.email}</div>}
  //         <TextField
  //           label="Password"
  //           variant="outlined"
  //           type="password"
  //           name="password"
  //           value={password}
  //           onChange={this.handleChange}
  //           error={!!errors.password}
  //           helperText={errors.password}
  //         />
  //         {errors.password && <div>{errors.password}</div>}
  //         <TextField
  //           label="Confirm Password"
  //           variant="outlined"
  //           type="password"
  //           name="confirmPassword"
  //           value={confirmPassword}
  //           onChange={this.handleChange}
  //           error={!!errors.confirmPassword}
  //           helperText={errors.confirmPassword}
  //         />
  //         {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
  //         {errors.apiError && <div>{errors.apiError}</div>}
  //         <Button type="submit" variant="contained" color="primary">
  //           Register
  //         </Button>
  //         <LoginRegisterButton dest="/login" buttonLabel="Login" />  
  //       </form>
  //     </div>
  //   );
  // }
  render() {
    const { username, email, password, confirmPassword, errors } = this.state;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={this.handleSubmit} style={{ textAlign: 'center', width: '300px' }}>
                <h2 style={{ marginBottom: '20px' }}>ResTracker Sign Up</h2>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </div>
                {errors.apiError && <div>{errors.apiError}</div>}
                <div style={{ marginBottom: '10px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </div>
                <LoginRegisterButton dest="/login" buttonLabel="Login" />
            </form>
        </div>
    );
}
}

export default SignUpForm;
