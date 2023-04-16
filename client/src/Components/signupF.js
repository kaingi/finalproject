import React, { useState } from 'react';
import axios from 'axios';
import './signupF.css';
import { useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number:'',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    number:'',
    password: '',
    confirmPassword: ''
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false); // new state variable
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    console.log(formData);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true); // set isSubmitting to true
      axios.post('http://localhost:3001/signup1', formData)
        .then(response => {
          console.log(response.data);
          navigate('/');
          setIsSubmitting(false); // set isSubmitting back to false
        })
        .catch(error => {
          console.log(error);
          setIsSubmitting(false); // set isSubmitting back to false
          setFormErrors({
            ...formErrors,
            email: 'Email Already Exists'
          });
        });
    }
  };


  

 const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (!data.number.trim()) {
      errors.number = 'number is required';
    } 

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <div className="signup-page">
      <h1>Farmer Signup</h1>
      <form onSubmit={handleFormSubmit} className="signup-form">
        <label>
          Username:
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            className={formErrors.username ? 'error' : ''}
            required
          />
          {formErrors.username && (
            <span className="error-message">{formErrors.email}</span>
          )}
        </label>
        <br />
        <label>
          Email:
          <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className={formErrors.email ? 'error' : ''}
            required
          />
           {formErrors.email && (
          <span className="error-message">{formErrors.email}</span>
            )}
        </label>
        <br />
        <label>
          PhoneNumber:
          <br />
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleFormChange}
            className={formErrors.number? 'error' : ''}
            required
          />
           {formErrors.number && (
          <span className="error-message">{formErrors.number}</span>
            )}
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
            className={formErrors.password ? 'error' : ''}
            required
          />
          {formErrors.password && (
            <span className="error-message">{formErrors.password}</span>
          )}
        </label>
        <br />
        <label>
          Confirm Password:
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormChange}
            className={formErrors.confirmPassword ? 'error' : ''}
            required
          />
          {formErrors.confirmPassword && (
            <span className="error-message">{formErrors.confirmPassword}</span>
          )}
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

