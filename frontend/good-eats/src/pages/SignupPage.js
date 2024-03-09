import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
    };
  }
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;

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
      this.setState({ username: '', email: '', password: '', error: '' });
    } catch (error) {
      // Handle error
      console.error('Error signing up:', error.response.data.message);
      this.setState({ error: error.response.data.message });
    }
  };

  render() {
    const { username, email, password, error } = this.state;
    return (
      <div>
        {error && <div>Error: {error}</div>}
        <form onSubmit={this.handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={this.handleChange} />
          
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
