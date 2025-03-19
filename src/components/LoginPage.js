import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/LoginActions";
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled , setIsDisavled] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const createFormData = () => {
    const Payload = new FormData();
    Object.keys(formData).forEach((key) => {
      Payload.append(key, formData[key]);
    });
    return Payload;
  };
  const handleForgot=()=>{
    Swal.fire({

      text: 'Please Contact Admin',
      confirmButtonText:'ok'
    });
  }
  // const handleSSO = () => {
  //   const clientId = 'YOUR_CLIENT_ID';
  //   const tenantId = 'YOUR_TENANT_ID';
  //   const redirectUri = 'http://localhost:3000/callback';

  //   // const microsoftSSOUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=openid%20profile%20email&state=12345`;
  //   const microsoftSSOUrl ='https://login.microsoftonline.com/common/oauth2/v2.0/authorize?scope=service%3A%3Aaccount.microsoft.com%3A%3AMBI_SSL+openid+profile+offline_access&response_type=code&client_id=81feaced-5ddd-41e7-8bef-3e20a2689bb7&redirect_uri=https%3A%2F%2Faccount.microsoft.com%2Fauth%2Fcomplete-signin-oauth&client-request-id=2979377f-3070-42a2-b1b1-7a55857fa1aa&x-client-SKU=MSAL.Desktop&x-client-Ver=4.61.3.0&x-client-OS=Windows+Server+2019+Datacenter&prompt=login&client_info=1&state=H4sIAAAAAAAEAAXBy6JCQAAA0H9pa8FFaNHCKwxGKK8dYiJmiLy-_p5zyoNx5Q383Jo4pW3xx0jsISLQiYhU0P5goSle6u4MvGfGc45k7obD9RtFeWh3Q7-5VRU4sOqz5Za9xDmwvePoEkpk3u6dQmePon7L3EtZpU4dxTktBxsAodsylhbkLpFV3ZzeQsxK_E7qjlrVNOfEdHNKS7wION3MoR0k46f4i94bRIY0l8itI_8dq64pUSl9qm8ZYnZkCOTl-2N54J52HtOI3ixGVjz458k-UqJFham_hktcY59alxEzjKf7SSZhMNL7vK3Pp7ELq2LnrcrNowL8pXBBpDEN6JGlEhALpMrnddh_Y-DyU1-oxI1RPxvbLaTv9aeqCW1DGSQlPtoaXa-nf5_88VpaAQAA&msaoauth2=true&lc=1033'
  //   window.location.href = microsoftSSOUrl;
  // };
  const Payload = createFormData();
  const handleSubmit = async (e) => {
    setIsDisavled(true)
    e.preventDefault();
    dispatch(userLogin(Payload))
      .then(async (response) => {
        if (response?.status === 200) {
          setIsDisavled(false)
          const data = await response;
          sessionStorage.setItem("access_token", data.data.access_token);
          navigate("/gitmetrics");
        } else {
          setIsDisavled(false)
          Swal.fire({
            title: sweetalert.ERROR_CONFIRMED_TEXT,
            text: response,
            icon: sweetalert.ERROR_ICON,
            confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT
          });
        }
      })
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label>Password:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ?
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          </button>
        </div>
        <div className="row flex ">
        <button type="submit" className="login-button" disabled={isDisabled}>
          Login
        </button>
      {/* <button
        type="button"
        className="microsoft-button bg-hover-btn"
        onClick={() => handleSSO()}
      >
        <div className="d-flex align-items-center justify-content-center">
          <img src="https://cdn.kekastatic.net/login/v/M178_2024.06.15.1/images/logos/microsoft.svg" alt="Microsoft logo" />
          <p className="microsoft-logo">Microsoft</p>
        </div>
      </button> */}
    </div>
        <p className="register-redirect">
          Don't have an account?
          <span className="register-link" onClick={handleRegister}>Register</span>
        </p>
        <p className="register-redirect">
          Forgot Password ?
          <span className="register-link" onClick={handleForgot}>Click</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
