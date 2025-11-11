import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegistration } from "../actions/LoginActions";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { sweetalert } from "../utils/constatnts";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    username: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const toggleVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: formData.email,
      full_name: formData.fullName,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      username: formData.username,
      company_name: formData.companyName,
    };

    try {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          title: sweetalert.ERROR_CONFIRMED_TEXT,
          text: "Passwords do not match.",
          icon: sweetalert.ERROR_ICON,
          confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
        });
        return;
      }

      const response = await dispatch(userRegistration(payload));

      if (response?.status === 200) {
        Swal.fire({
          title: sweetalert.SUCCESS_TITLE,
          text: response?.data.message,
          icon: sweetalert.SUCCESS_ICON,
          confirmButtonText: sweetalert.SUCCESS_TITLE,
          didOpen: () => {
            Swal.showLoading();
            setTimeout(Swal.close, 1000);
          },
        });
        navigate("/");
      } else {
        Swal.fire({
          title: sweetalert.ERROR_CONFIRMED_TEXT,
          text: response,
          icon: sweetalert.ERROR_ICON,
          confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
        });
      }
    } catch (err) {
      Swal.fire({
        title: sweetalert.ERROR_CONFIRMED_TEXT,
        text: err.message,
        icon: sweetalert.ERROR_ICON,
        confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
      });
    }
  };

  const redirectToLogin = () => {
    navigate("/");
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <form className="register-form" onSubmit={handleFormSubmit}>
          <h2>Register</h2>

          {error && (
            <p className="error" style={{ color: "red", marginBottom: "20px" }}>
              {error}
            </p>
          )}

          <div className="form-row">
            <div className="form-details">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-details">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-details">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-details">
              <label htmlFor="password">New Password:</label>
              <div className="password-container">
                <input
                  type={passwordVisibility.password ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("password")}
                >
                  {passwordVisibility.password ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="form-details">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="password-container">
                <input
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("confirmPassword")}
                >
                  {passwordVisibility.confirmPassword ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>

          <div className="login-redirect">
            <p>
              Already have an account?{" "}
              <span className="login-link" onClick={redirectToLogin}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2L22 22"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
