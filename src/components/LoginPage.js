import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useDispatch } from "react-redux";
import { userLogin,userDetails } from "../actions/LoginActions";
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
import Neo from '../Assets/neoAI.png'
const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisavled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const FullScreenLoader = () => (
    <div className="loader-overlay">
      <div className="spinner-border text-white" role="status">
      </div>
    </div>
  );
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
  const handleForgot = () => {
    Swal.fire({
      text: 'Please Contact Admin',
      confirmButtonText: 'ok'
    });
  }
  const Payload = createFormData();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setIsDisavled(true);

  dispatch(userLogin(Payload)).then(async (response) => {
    setLoading(false);
    setIsDisavled(false);

    if (response?.status === 200) {
      const data = await response;
      const token = data.data.access_token;

      sessionStorage.setItem("access_token", token);

      // Dispatch the second GET API call
      dispatch(userDetails(token))
        .then((metricsResponse) => {
          // Optionally handle metricsResponse
          console.log("Metrics data:", metricsResponse);
          navigate("/metrics");
        })
        .catch((err) => {
          console.error("Error fetching metrics:", err);
          Swal.fire({
            title: sweetalert.ERROR_CONFIRMED_TEXT,
            text: "Failed to load metrics.",
            icon: sweetalert.ERROR_ICON,
            confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
          });
        });
    } else {
      Swal.fire({
        title: sweetalert.ERROR_CONFIRMED_TEXT,
        text: response,
        icon: sweetalert.ERROR_ICON,
        confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
      });
    }
  });
};


  const handleRegister = () => {
    navigate("/register");
  };

  return (
    
    <div className="login-container">
       {loading && <FullScreenLoader />}
      <form className="login-form" onSubmit={handleSubmit}>
      <img
            src={Neo}
            alt="Bilvantis Logo"
            style={{ height: "30px", width:'35px' }} // Adjust logo height if needed
          /><div style={{fontSize:'5px'}}>Engineering with AI</div>
        <h4>Login</h4>
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
