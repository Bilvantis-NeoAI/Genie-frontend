import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevents form default submission
    
        // Password validation
        if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              full_name: fullname,
            }),
          });
    
          if (response.ok) {
            // Navigate to login on success
            navigate('/');
          } else {
            const data = await response.json();
            if (data.detail) {
              setErrorMessage(data.detail); // Display error from API response
            } else {
              setErrorMessage('Registration failed. Please try again.');
            }
          }
        } catch (error) {
          setErrorMessage('An error occurred. Please try again.');
        }
      };
    

    const handleLogin = () => {
        navigate('/')
    }

    return (
        <div className='login-container'>
      <div className="login-card pt-4 pb-4">
        <h4>Get Registered</h4>
        <form className='login-form' onSubmit={handleRegister}>
          <div className="text-area">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username*"
              className="text-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="text-area mt-4">
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name*"
              className="text-input"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="text-area mt-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password*"
              className="text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-area mt-4">
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password*"
              className="text-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="error-message text-danger mt-2">{errorMessage}</div>
          )}

          <input
            type="submit"
            value="REGISTER"
            className="login-button"
          />
        </form>
        <div className='pt-4'>
          <span className='font-bold-600'>Already Registered ?</span><span className='px-2 register-link' onClick={handleLogin}>Login</span>
        </div>
      </div>
    </div>
    )
} 

export default Register