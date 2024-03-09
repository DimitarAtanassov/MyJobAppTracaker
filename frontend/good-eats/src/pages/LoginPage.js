import React, { Component } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };

    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name] : value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respone = await axios.post('API ROUTE FOR LOGIN', {
                username,
                password
            });

            // Handle Login Success
            console.log("User Logged In Successfully", response.data);

            // Reset Form Fields
            this.setState({username: '', password: ''})
        } catch (error) {
            console.error('Error Logging User In: ', error.response.data.message);
        }
    }

    render() {
        const username = this.state.username;
        const password = this.state.password;
        return (
            <div>
                <form>
                    <InputField
                        label="Username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        style={{}}
                    />
                    <InputField 
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        style={{}}
                    />
                </form>
            </div>
        );
    };
};

export default LoginPage