import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

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

    if (formData.username.trim() === '' || formData.username !== 'test') {
      errors.username = 'Please enter a valid username';
      valid = false;
    }

    if (formData.password.trim() === '' || formData.password !== 'test123') {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/homepage'); 
    }
  };

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
      </div>
    </div>
  );
};

export default LoginPage;
