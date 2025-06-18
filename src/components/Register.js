import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css'
import { useDispatch } from "react-redux";
import { userRegistration } from "../actions/LoginActions";
import Swal from "sweetalert2";
import { sweetalert } from "../utils/constatnts";
import { encryptData } from "../utils/config";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    let dispatch = useDispatch()
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const encryptedPassword =await encryptData(formData.password);
        const encryptedConfirmPassword = await encryptData(formData.confirmPassword);
        const payload = {
            email: formData.email,
            full_name: formData.fullName,
            password: encryptedPassword,
            confirm_password: encryptedConfirmPassword,
            username: formData.username,
            company_name: formData.companyName,
        };
        dispatch(userRegistration(payload))
            .then((response) => {
                if (response?.status === 200) {
                    Swal.fire({
                        title: sweetalert.SUCCESS_TITLE,
                        text: response?.data.message,
                        icon: sweetalert.SUCCESS_ICON,
                        confirmButtonText: sweetalert.SUCCESS_TITLE,
                        didOpen: function () {
                            Swal.showLoading()
                            setTimeout(function () {
                                Swal.close()
                            }, 1000)
                        }
                    });
                    navigate("/");
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
    const handleLogin = () => {
        navigate("/");
    };
    return (
        <div className="register-body">
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    {error && <p className="error" style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}
                    <div className="form-row">
                        <div className="form-details">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter your email"
                                onChange={handleChange}
                                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$"
                                required
                                title="Please enter a valid email address."
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="username">User Name:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Enter your username"
                                onChange={handleChange}
                                pattern="^[A-Za-z\s]+$"
                                required
                                title="Username should contain only letters and spaces."
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-details">
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                pattern="^[A-Za-z\s]+$"
                                title="Full name should contain only letters and spaces."
                                required
                            />
                        </div>
                        <div className="form-details">
                            <label htmlFor="companyName">Company Name:</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Enter your company name"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-details">
                            <label htmlFor="password">Password:</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$"
                                    required
                                    title="Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
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
                        </div>
                        <div className="form-details">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <div className="password-container">
                                <input
                                     type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$"
                                    required
                                    title="Confirm password must match the required format."
                                />
                                <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ?
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
                        </div>
                    </div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                    <div className="login-redirect">
                        <p>
                            Already have an account?
                            <span className="login-link ms-2" onClick={handleLogin}>
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
