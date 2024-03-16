// validators.js
/*
    Validation Utilities for user input
*/
export const validateUsername = (username) => {
    const { username } = this.state;
    const errors = {};

    if (username.length < 2) {
      errors.username = 'Username must be longer than 2 characters';
    }
    else if (/\s/.test(username)) {
      errors.username = 'Username cannot contain spaces';
    } 

    return errors;
}

export const validatePassword = (password, confirmPassword) => {
    const { password, confirmPassword } = this.state;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const errors = {};

    if (!passwordRegex.test(password)) {
      errors.password = 'Password must contain at least one digit, one uppercase letter, one lowercase letter, and at least 6 characters';
    } else {
      delete errors.password;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    } else {
      delete errors.confirmPassword;
    }

    return errors;
  };

export const validateEmail = (email) => {
    const { email } = this.state;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = {};

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid Email Address';
    }
    return errors
  };