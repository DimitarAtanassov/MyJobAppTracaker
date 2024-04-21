// LoginPage.js
/* Class Component: The Login Page for our web app*/

// Imports
//===============================================================
import React, { Component } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import LoginRegisterButton from '../components/LoginRegisterButton';
import SendIcon from '@mui/icons-material/Send';
import { NavLink } from 'react-router-dom';
import { loginService } from '../utils/apiService';
// LoginPage
//===============================================================
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            loading: false, // Add loading state to indicate ongoing API req
        };
    };



    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name] : value, loading: false });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {username,password} = this.state;
        const errors = {};

        if(!username){
            errors.username = "Username is required";
        }
        if(!password){
            errors.password = "Password is required";
        }
        // Check if there is any errors
        if (Object.keys(errors).length > 0) {
            this.setState({errors});
            return;
        }
        
        try 
        {
            this.setState({ loading: true, errors: {} });
            const data = await loginService(username,password);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', username); // Store the username
            localStorage.setItem('userSocialMedia', data.socialMediaLinks);
            // Redirect or any other actions should be performed here
            console.log('User Logged In Successfully', data);
            window.location.href = '/jobapps';
            this.setState({ username: '', password: '', email: '', loading: false });
        } catch (error) {
            if (error.message === "Username is invalid or does not exist") {
                this.setState({ errors: { username: error.message }, loading: false }); // Clear loading state
            } else if (error.message === "Incorrect password") {
                this.setState({ errors: { password: error.message }, loading: false }); // Clear loading state
            } else {
                this.setState({ errors: { apiError: error.message }, loading: false }); // Clear loading state
            }
        }

    }


    // login = async (username,password) => {
    //     try {
    //         const response = await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/users/login', {username,password});
    //         const data = response.data;
    //         // Successful login
    //         if (response.status === 200)
    //         {
    //             localStorage.setItem('token', data.accessToken);
    //             localStorage.setItem('userId', data.userId);
    //             localStorage.setItem('username', username); // Store the username
    //             // Redirection or any other actions should be preformed here
    //             console.log("User Logged In Successfully", data);
    //             window.location.href = '/jobapps';
    //             // Reset the Form Fields
    //             this.setState({username:'', password: '', email: ''});
    //         }
    //         else {
    //             // Failed Login
    //             console.error("Login Failed: ", data.message);
    //             this.setState({ errors: { apiError: data.message } });
    //         }
    //     }catch (error) {
    //         console.error("Error Logging In: ", error.message);
    //         this.setState({errors: { apiError: 'An error occurred while logging in.'}});
    //     }
    // }

    // render() {
    //     const username = this.state.username;
    //     const password = this.state.password;
    //     const errors = this.state.errors;
    //     return (
    //         <div>
                
    //             <form onSubmit={this.handleSubmit}>
                    
    //                 <TextField
    //                     label="Username"
    //                     variant="outlined"
    //                     type="text"
    //                     name="username"
    //                     value={username}
    //                     onChange={this.handleChange}
    //                     error={!!errors.username}
    //                     helperText={errors.username}
    //                 />
    //                 {errors.username && <div>{errors.username}</div>}
                    
    //                 <TextField
    //                     label="Password"
    //                     variant="outlined"
    //                     type="password"
    //                     name="password"
    //                     value={password}
    //                     onChange={this.handleChange}
    //                     error={!!errors.password}
    //                     helperText={errors.password}
    //                 />
    //                 {errors.password && <div>{errors.password}</div>}
                    
    //                 {errors.apiError && <div>{errors.apiError}</div>}
                    
    //                 <Button type="submit" variant="contained" color="primary">
    //                     Login
    //                 </Button>
    //                 <LoginRegisterButton dest="/signup" buttonLabel="Sign Up" />                 
                
    //             </form>
            
    //         </div>
    //     );
    // };
    render() {
        const { username, password, errors, loading } = this.state;

        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
                    <h2 style={{ marginBottom: '20px' }}>Res Tracker</h2>
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
                    {errors.apiError && <div style={{ color: 'red', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.apiError}</div>}
                    <Box mb={2}>
                        <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />} disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Box>
                    <Box>
                        <LoginRegisterButton dest="/forgotPassword" buttonLabel="Forgot Password" />
                        <p>New users sign up <NavLink to="/signup" style={{ color: 'blue' }}>here</NavLink></p>
                    </Box>
                </form>
            </Box>
        );
    }
};

export default LoginPage