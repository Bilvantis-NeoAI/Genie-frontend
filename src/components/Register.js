import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegistration } from "../actions/LoginActions";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { sweetalert } from "../utils/constatnts";

const Register = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        username: "",
        companyName: "",
    });

    // State for error handling and password visibility
    const [error, setError] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle password visibility
    const toggleVisibility = (field) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        const payload = {
            email: formData.email,
            full_name: formData.fullName,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            username: formData.username,
            company_name: formData.companyName,
        };

        try {
            const response = await dispatch(userRegistration(payload));
console.log("====responseresponse from test",response);

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
                throw new Error(response?.data?.message || "Registration failed");
            }
        } catch (err) {
            console.log("====errerr",err);
            
            Swal.fire({
                title: sweetalert.ERROR_CONFIRMED_TEXT,
                text: err.message,
                icon: sweetalert.ERROR_ICON,
                confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
            });
        }
    };

    // Navigate to login
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
                            <label htmlFor="password">Your Password:</label>
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
                                    {passwordVisibility.password ? (
                                        <EyeOffIcon />
                                    ) : (
                                        <EyeIcon />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form-details">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <div className="password-container">
                                <input
                                    type={passwordVisibility.confirmPassword ? "text" : "password"}
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

// SVG components for icons
const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Eye icon */}
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Eye off icon */}
    </svg>
);
