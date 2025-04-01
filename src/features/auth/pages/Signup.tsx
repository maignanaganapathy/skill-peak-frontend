"use client";
import * as React from "react";
import {
    Box,
    Typography,
    IconButton,
    Link as MuiLink,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import Button from "../components/Button";
import { signup } from "../services/api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { setAuthToken } from "../../../utils/axiosConfig"; // Import the setAuthToken function

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: "",
        mobile: "",
        password: "",
    });
    const [errors, setErrors] = React.useState({
        email: "",
        mobile: "",
        password: "",
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "" : "Invalid email address";
    };

    const validateMobile = (mobile: string) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile) ? "" : "Invalid mobile number (10 digits required)";
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error for the changed field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Allow only digits
        const numericValue = value.replace(/[^0-9]/g, '');
        setFormData((prev) => ({
            ...prev,
            [name]: numericValue,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = validateEmail(formData.email);
        const mobileError = validateMobile(formData.mobile);
        const passwordError = validatePassword(formData.password);

        if (emailError || mobileError || passwordError) {
            setErrors({
                email: emailError,
                mobile: mobileError,
                password: passwordError,
            });
            return;
        }

        try {
            const response = await signup(formData.email, formData.mobile, formData.password);

            // ✅ Set token and userId in cookies, explicitly setting the path to root
            Cookies.set("authToken", response.token, { expires: 1, path: '/' });
            Cookies.set("userId", response.userId.toString(), { expires: 1, path: '/' });

            // Call setAuthToken after setting the cookie
            setAuthToken();

            toast.success("Signup successful!");
            navigate("/dashboard"); // Navigate to the dashboard after successful signup
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: 500,
                    position: "relative",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={() => navigate("/")}
                    sx={{ position: "absolute", top: 16, right: 16, color: "secondary.main" }}
                >
                    <Close />
                </IconButton>

                {/* Logo */}
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Logo" width={50} height={50} />
                </Box>

                {/* Heading */}
                <Typography variant="h6" align="center" mb={3}>
                    Create Your Account
                </Typography>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="textSecondary" mb={0.5} display="block">
                            Email*
                        </Typography>
                        <Box
                            component="input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            required
                            sx={{
                                width: "100%",
                                px: 2,
                                py: 1,
                                border: `1px solid ${errors.email ? "red" : "#ccc"}`,
                                borderRadius: 1,
                                fontSize: "14px",
                                outline: "none",
                            }}
                        />
                        {errors.email && (
                            <Typography variant="caption" color="error" display="block">
                                {errors.email}
                            </Typography>
                        )}
                    </Box>

                    {/* Mobile */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="textSecondary" mb={0.5} display="block">
                            Mobile*
                        </Typography>
                        <Box
                            component="input"
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleMobileChange} // Use handleMobileChange
                            placeholder="Enter your Mobile Number"
                            required
                            sx={{
                                width: "100%",
                                px: 2,
                                py: 1,
                                border: `1px solid ${errors.mobile ? "red" : "#ccc"}`,
                                borderRadius: 1,
                                fontSize: "14px",
                                outline: "none",
                            }}
                        />
                        {errors.mobile && (
                            <Typography variant="caption" color="error" display="block">
                                {errors.mobile}
                            </Typography>
                        )}
                    </Box>

                    {/* Password */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="caption" color="textSecondary" mb={0.5} display="block">
                            Password*
                        </Typography>
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Box
                                component="input"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a Password"
                                required
                                sx={{
                                    width: "100%",
                                    px: 2,
                                    py: 1,
                                    border: `1px solid ${errors.password ? "red" : "#ccc"}`,
                                    borderRadius: 1,
                                    fontSize: "14px",
                                    outline: "none",
                                }}
                            />
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    padding: 0.5,
                                }}
                            >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                        </Box>
                        {errors.password && (
                            <Typography variant="caption" color="error" display="block">
                                {errors.password}
                            </Typography>
                        )}
                    </Box>

                    {/* Submit Button */}
                    <Button type="submit">Create Account</Button>
                </form>

                {/* Footer */}
                <Typography variant="body2" align="center" mt={3}>
                    Already have an account?{" "}
                    <MuiLink component={Link} to="/login" underline="hover" color="primary">
                        Log In
                    </MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default SignUp;