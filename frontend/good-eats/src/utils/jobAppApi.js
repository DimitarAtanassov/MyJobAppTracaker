// jobAppApi.js

/*
    Contains API call logic for Job Applications
*/
import axios from 'axios';

const BASE_URL = 'https://crud-api-c680d4c27735.herokuapp.com/api/users/jobApps';

export const createJobApplication = async(formData) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            throw new Error('JWT token not found');
        }

        const response = await axios.post(BASE_URL, formData, {
            header: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllJobApplications = async () => {
    try {
        // Retrieve the user ID from local storage
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (!userId) {
            throw new Error('User ID not found in local storage');
        }

        // Include the user ID in the request URL
        const response = await axios.get(`/api/users/jobApps?userId=${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}