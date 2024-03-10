import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import LoginRegisterButton from '../components/LoginRegisterButton';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
        };
    };

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name] : value });
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
        try {
            await this.login(username, password);
        } catch (error) {
            console.error('Error Logging User In: ', error.response.data.message);
            this.setState({ errors: { apiError: error.response.data.message } });
        }

    }

    login = async (username,password) => {
        try {
            const response = await axios.post('https://crud-api-c680d4c27735.herokuapp.com/api/users/login', {username,password});
            const data = response.data;

            // Successful login
            if (response.status === 200)
            {
                localStorage.setItem('token', data.token);
                
                // Redirection or any other actions should be preformed here
                console.log("User Logged In Successfully", data);
                window.location.href = '/homepage';
                // Reset the Form Fields
                this.setState({username:'', password: '', email: ''});
            }
            else {
                // Failed Login
                console.error("Login Failed: ", data.message);
                this.setState({ errors: { apiError: data.message } });
            }
        }catch (error) {
            console.error("Error Logging In: ", error.message);
            this.setState({errors: { apiError: 'An error occurred while loggin in.'}});
        }
    }

    render() {
        const username = this.state.username;
        const password = this.state.password;
        const errors = this.state.errors;
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                    
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        style={errors.username ? {borderColor: 'red'} : {}}
                    />
                    {errors.username && <div>{errors.username}</div>}
                    
                    <InputField 
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        style={errors.password ? {borderColor: 'red'} : {}}
                    />
                    {errors.password && <div>{errors.password}</div>}
                    
                    {errors.apiError && <div>{errors.apiError}</div>}
                    
                    <button type='submit'>Login</button> 
                    <LoginRegisterButton dest="/signup" buttonLabel="Sign Up" />                 
                
                </form>
            
            </div>
        );
    };
};

export default LoginPage