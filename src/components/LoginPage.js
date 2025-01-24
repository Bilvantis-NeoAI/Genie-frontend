import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/LoginActions";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { sweetalert } from "../utils/constatnts";
const LoginPage = () => {  
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
  const Payload = createFormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin(Payload))
      .then(async (response) => {
        if (response?.status === 200) {
          const data = await response;
          sessionStorage.setItem("access_token", data.data.access_token);
          navigate("/metrics");
        } else {
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
        <label id="email-label">Email:</label>
        <input
          type="email"
          aria-labelledby ="email-label"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <label id="password-label">Password:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
             aria-labelledby ="password-label"
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
                <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            }
          </button>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="register-redirect">
          Don't have an account?
          <span className="register-link" onClick={handleRegister}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
