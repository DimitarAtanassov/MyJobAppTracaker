
# Job Applications Tracker (Currently Refactoring Project Strucutre)

## Overview

The Job Applications Tracker is a web application designed to help users keep track of their job applications effectively. Users can sign up, log in, create new job applications, view existing ones, and update their application status.

## Features

- **User Authentication**: Users can sign up with a username, email, and password. They can also log in securely to access their account.
- **Password Reset**: Forgot your password? No worries! Users can request a password reset link via email.
- **Job Application Management**: Users can create, view, and update job applications. They can track the status of each application, such as pending, accepted, or rejected.
- **Bar Chart Visualization**: Visual representation of job application statuses through a bar chart. Users can easily see the distribution of their applications across accepted, rejected, and pending statuses.
- **Filter by User Search**: Users can search for specific job applications by company name or job title, making it easier to find and manage relevant applications.
- **Filter by Job Application Status**: Users can filter their job applications based on their status (accepted, rejected, pending), allowing them to focus on specific subsets of applications.
- **User-Friendly Interface**: The application offers a clean and intuitive user interface for seamless navigation.

## Technologies Used

- **Frontend**: React.js with Material-UI for building the user interface.
- **Backend**: Node.js with Express for the server-side logic.
- **Database**: MongoDB for storing user data and job applications.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **API Integration**: Axios for making HTTP requests to the backend API.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/yourusername/job-applications-tracker.git`
2. Navigate to the project directory: `cd job-applications-tracker`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit: `http://localhost:3000`

## Project Structure

- **/src/components**: Contains reusable React components used across the application.
- **/src/pages**: Includes individual pages/components of the application, such as SignUp, Login, ForgotPassword, etc.
- **/src/utils**: Contains utility functions and helper methods.
- **/public**: Static assets and HTML template.

## Screenshots

![Job Apps Page Screenshot](https://github.com/DimitarAtanassov/MyJobAppTracaker/blob/main/jobappspage.png)

![Job App Chart Screenshot](https://github.com/DimitarAtanassov/MyJobAppTracaker/blob/main/jobChart.png)

![User Profile Screenshot](https://github.com/DimitarAtanassov/MyJobAppTracaker/blob/main/userprofile.png)

![Login Page Screenshot](https://github.com/DimitarAtanassov/MyJobAppTracaker/blob/main/signin.png)

![Sign Up Page Screenshot](https://github.com/DimitarAtanassov/MyJobAppTracaker/blob/main/signup.png)

## Contributing

Contributions to this project are welcome! If you encounter any bugs or have suggestions for improvement, feel free to open an issue or submit a pull request.
