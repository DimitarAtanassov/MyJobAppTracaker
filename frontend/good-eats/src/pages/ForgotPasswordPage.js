// ForgotPasswordPage.js 
/* Class Component: The Forgot Password Page for our web app */

// Imports
//===============================================================
import React, {Component} from 'react';
import {TextField, Button, Box} from '@mui/material';
import axios from 'axios';
import LoginRegisterButton from '../components/LoginRegisterButton';

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors:{}
        };
    };

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name] : value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email} = this.state;
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
            this.setState({ errors });
            return;
        }

        try {
            const response = await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/forgot-password', {
                email: this.state.email,
              });
              alert('Please check your email for the Password Reset link.');

        }catch (error) {
            console.error('Error sending password reset email:', error);
        }
    }

    render() {
        const {email,errors} = this.state;

        return(
            <Box display="flex" justifyContent="center" alignItems="center"  height="100vh">
                <form onSubmit={this.handleSubmit} style={{textAlign:"center"}}>
                    <Box mb={2}>
                        <TextField
                            label="Enter your email"
                            variant="outlined"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            error={!!errors.email} 
                            helperText={errors.email}
                        />
                    </Box>

                    <Box mb={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Send Password Reset Link
                        </Button>
                    </Box>
                    <Box>
                        <LoginRegisterButton dest="/login" buttonLabel="Back to Login Page"></LoginRegisterButton>
                    </Box>
                </form>
            </Box>
        )
    }
}

export default ForgotPasswordPage;