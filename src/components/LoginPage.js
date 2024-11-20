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
  const [visble, setVisbile] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        navigate('/admin');
      }

      else if (formData.username === 'test' && formData.password === 'test123') {
        navigate('/homepage');
      }
      else {
        setErrors({
          username: '',
          password: 'Invalid username or password'
        });
      }
    }
  };

  const regsiter = () => {
    setVisbile(!visble);
  }

  const handleSSO = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const tenantId = 'YOUR_TENANT_ID';
    const redirectUri = 'http://localhost:3000/callback';

    // const microsoftSSOUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=openid%20profile%20email&state=12345`;
    const microsoftSSOUrl ='https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=service%3A%3Aaccount.microsoft.com%3A%3AMBI_SSL+openid+profile+offline_access&response_type=code&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&redirect_uri=https%3A%2F%2Faccount.microsoft.com%2Fauth%2Fcomplete-signin-oauth&client-request-id=2979377f-3070-42a2-b1b1-7a55857fa1aa&x-client-SKU=MSAL.Desktop&x-client-Ver=4.61.3.0&x-client-OS=Windows+Server+2019+Datacenter&prompt=login&client_info=1&state=H4sIAAAAAAAEAAXBy6JCQAAA0H9pa8FFaNHCKwxGKK8dYiJmiLy-_p5zyoNx5Q383Jo4pW3xx0jsISLQiYhU0P5goSle6u4MvGfGc45k7obD9RtFeWh3Q7-5VRU4sOqz5Za9xDmwvePoEkpk3u6dQmePon7L3EtZpU4dxTktBxsAodsylhbkLpFV3ZzeQsxK_E7qjlrVNOfEdHNKS7wION3MoR0k46f4i94bRIY0l8itI_8dq64pUSl9qm8ZYnZkCOTl-2N54J52HtOI3ixGVjz458k-UqJFham_hktcY59alxEzjKf7SSZhMNL7vK3Pp7ELq2LnrcrNowL8pXBBpDEN6JGlEhALpMrnddh_Y-DyU1-oxI1RPxvbLaTv9aeqCW1DGSQlPtoaXa-nf5_88VpaAQAA&msaoauth2=true&lc=1033'
    window.location.href = microsoftSSOUrl;
  };
  return (
    <div className='login-container'>
      <div className="login-card pt-5 pb-5">
        <h4>{visble ? 'Register' : 'Login'}</h4>
        <form className='login-form' onSubmit={handleSubmit}>
          {!visble ?
            <div>
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
            </div>
            : <div>
              <div className="text-area">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Name"
                  className="text-input"
                />
              </div>
              {/* {errors.username && <span className="login-error">{errors.username}</span>} */}

              <div className="text-area mt-4">
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Email"
                  className="text-input"
                />
              </div>

              <div className="text-area mt-4">
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="text-input"
                />
              </div>

              <div className="text-area mt-4">
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Organization"
                  className="text-input"
                />
              </div>
              {/* {errors.password && <span className="login-error">{errors.password}</span>} */}
            </div>}
          {!visble ?
            <div className='d-flex justify-content-around'>
              <input
                type="submit"
                value="LOGIN"
                className="login-button"
              />
              
              <input
                value="REGISTER"
                className="login-button"
                style={{ textAlign: 'center' }}
                onClick={() => regsiter()}
              />
              {/* <input
                value="SSO"
                className="login-button"
                style={{ textAlign: 'center' }}
                onClick={() => handleSSO()}
              /> */}
            <div className="login-option" style={{ alignItems: 'center' }}>
      <button
        type="button"
        className="microsoft-button bg-hover-btn"
        onClick={() => handleSSO()}
      >
        <div className="d-flex align-items-center justify-content-center">
          <img src="https://cdn.kekastatic.net/login/v/M178_2024.06.15.1/images/logos/microsoft.svg" alt="Microsoft logo" />
          <p className="microsoft-logo">Microsoft</p>
        </div>
      </button>
    </div>
               </div> : <div> <input
                value="SUBMIT"
                className="login-button"
                style={{ textAlign: 'center' }}
                onClick={() => regsiter()}
              />
            </div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
