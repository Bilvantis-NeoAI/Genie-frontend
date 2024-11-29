import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MicrosoftLogin from './MicrosoftLogin';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const validateForm = () => {
    let valid = true;
    let errors = { username: '', password: '' };

    if (formData.username.trim() === '') {
      errors.username = 'Please enter a valid username';
      valid = false;
    }

    if (formData.password.trim() === '') {
      errors.password = 'Please enter a valid password';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        navigate('/admin'); 
      } 
     
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(formData).toString() // Convert to form data format
        });

        if (!response.ok) {
          throw new Error('Invalid username or password');
        }

        const data = await response.json();

        sessionStorage.setItem('access_token', data.access_token);

        navigate('/homepage');
      } catch (error) {
        setErrors({
          username: '',
          password: 'Invalid username or password'
        });
      }
    }
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className='login-container'>
      <div className="login-card pt-5 pb-5">
        <h4>Login</h4>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className="text-area">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="text-input"
            />
          </div>
          {errors.username && <span className="login-error">{errors.username}</span>}

          <div className="text-area mt-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="text-input"
            />
          </div>
          {errors.password && <span className="login-error">{errors.password}</span>}

          <input
            type="submit"
            value="LOGIN"
            className="login-button"
          />
        </form>
        <div className='pt-4'>
          <span className='font-bold-600'>Not Reistered Yet ?</span>
          <span className='px-2 register-link' onClick={handleRegister}>Register</span>
          {/* <span>(OR)</span> */}
        </div>
        {/* <div className="mt-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MicrosoftLogin />
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
