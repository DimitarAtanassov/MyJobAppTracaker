import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../components/InputField'; // Assuming InputField is in a separate file

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      passwordValidation: {}
    };
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (name === 'password' || name === 'confirmPassword') {
        this.validatePassword();
      }
    });
  };

  validatePassword = () => {
    const { password, confirmPassword } = this.state;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      this.setState({ error: 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and at least 6 characters' });
      return false;
    } else if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    } else {
      this.setState({ error: '' });
      return true;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    // Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
      this.setState({ error: 'Please fill out all fields' });
      return;
    }

    if (!this.validatePassword()) {
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
      this.setState({ username: '', email: '', password: '', confirmPassword: '', error: '' });
    } catch (error) {
      // Handle error
      console.error('Error signing up:', error.response.data.message);
      this.setState({ error: error.response.data.message });
    }
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;
    const emptyFieldStyle = { borderColor: 'red' }; // Define style for empty fields

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputField label="Username" type="text" name="username" value={username} onChange={this.handleChange} style={username ? {} : emptyFieldStyle} />
          <InputField label="Email" type="email" name="email" value={email} onChange={this.handleChange} style={email ? {} : emptyFieldStyle} />
          <InputField label="Password" type="password" name="password" value={password} onChange={this.handleChange} style={password ? {} : emptyFieldStyle} />
          <InputField label="Reenter Password" type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} style={confirmPassword ? {} : emptyFieldStyle} />
          {error && <div>Error: {error}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
