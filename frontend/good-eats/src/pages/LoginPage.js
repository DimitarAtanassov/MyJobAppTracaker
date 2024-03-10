import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';

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
            const response = await axios.post('API ROUTE FOR LOGIN', {
                username,
                password
            });

            // Handle Login Success
            console.log("User Logged In Successfully", response.data);

            // Reset Form Fields
            this.setState({username: '', password: '', errors: {}})
        
        } catch (error) {
            console.error('Error Logging User In: ', error.response.data.message);
            this.setState({ errors: { apiError: error.response.data.message } });
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
                    
                    <button type='submit'>Login In</button>
                
                </form>
            
            </div>
        );
    };
};

export default LoginPage