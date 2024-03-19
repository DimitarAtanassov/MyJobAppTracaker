// apiService.js
import axios from 'axios';
const API_URL = "https://crud-api-c680d4c27735.herokuapp.com"

export const loginService = async( username, password) => {
    try 
    {
        
        const response = await axios.post( `${API_URL}/api/users/login`, {username,password});
        
        return response.data
    
    }
    
    catch(error) 
    {
        if(error.response.status === 404) 
        {
            // Invalid username/user not found
            throw new Error('Username is invalid or does not exist');
        }

        else if(error.response.status === 401)
        {
            // Invalid password
            throw new Error('Incorrect password');
        }

        else
        {
            throw new Error('An error occured');
        }

        
    };
}