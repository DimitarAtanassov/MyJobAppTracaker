import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../components/InputField'; // Assuming InputField is in a separate file
import LoginRegisterButton from '../components/LoginRegisterButton';
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
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === 'password' || name === 'confirmPassword') {
        this.validatePassword();
      }
      if (name === 'email') {
        this.validateEmail();
      }
      if (name === 'username') {
        this.validateUsername();
      }
    });
  };

  validateUsername = () => {
    const { username } = this.state;
    const errors = {};

    if (username.length < 2) {
      errors.username = 'Username must be longer than 2 characters';
    }
    else if (/\s/.test(username)) {
      errors.username = 'Username cannot contain spaces';
    } 
    else {
      delete errors.username;
    }

    this.setState({errors});
    
  }
  validatePassword = () => {
    const { password, confirmPassword } = this.state;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const errors = {};

    if (!passwordRegex.test(password)) {
      errors.password = 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and at least 6 characters';
    } else {
      delete errors.password;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    } else {
      delete errors.confirmPassword;
    }

    this.setState({ errors });
  };

  validateEmail = () => {
    const { email } = this.state;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = {};

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid Email Address';
    } else {
      delete errors.email;
    }

    this.setState({ errors });
  };



  handleSubmit = async (e) => {
    e.preventDefault();

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

    this.validateUsername();
    this.validatePassword();
    this.validateEmail();

    // errors object will only have keys if there are errors so if the length == 0 there are no errors
    if (Object.keys(this.state.errors).length > 0) {
      return;
    }

    try {
      // Make POST request to your API endpoint
      const response = await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/users', {
        username,
        email,
        password
      });

      // Handle successful response
      console.log('User signed up successfully:', response.data);

      // Reset form fields
      this.setState({ username: '', email: '', password: '', confirmPassword: '', errors: {} });
    } catch (error) {
      // Handle error
      console.error('Error signing up:', error.response.data.message);
      /*
      this is what the line of code below does   
      errors: {
        ...prevState.errors,
      apiError: error.response.data.message
      }
  */
      this.setState({ errors: { apiError: error.response.data.message } });
    }
  };

  render() {
    const { username, email, password, confirmPassword, errors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            style={errors.username ? { borderColor: 'red' } : {}}
          />
          {errors.username && <div>{errors.username}</div>}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            style={errors.email ? { borderColor: 'red' } : {}}
          />
          {errors.email && <div>{errors.email}</div>}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            style={errors.password ? { borderColor: 'red' } : {}}
          />
          {errors.password && <div>{errors.password}</div>}
          <InputField
            label="Reenter Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            style={errors.confirmPassword ? { borderColor: 'red' } : {}}
          />
          {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
          {errors.apiError && <div>{errors.apiError}</div>}
          <button type="submit">Register</button> 
          <LoginRegisterButton dest="/login" buttonLabel="Login" />  
        </form>
      </div>
    );
  }
}

export default SignUpForm;
