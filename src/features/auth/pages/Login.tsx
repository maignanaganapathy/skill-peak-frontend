import * as React from "react";
import {
    Box,
    TextField,
    Typography,
    IconButton,
    Link as MuiLink,
    Modal,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../../../assets/logo.svg";
import { login } from "../services/api";
import Button from "../components/Button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { setAuthToken } from "../../../utils/axiosConfig";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const [openForgotPasswordModal, setOpenForgotPasswordModal] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent login attempt if forgot password modal is open
        if (openForgotPasswordModal) {
            return;
        }

        // Basic client-side validation
        if (!formData.email || !formData.password) {
            toast.error("Please fill out all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await login(formData.email, formData.password);

            Cookies.set("authToken", response.token, { expires: 1, path: '/' });
            Cookies.set("userId", response.userId.toString(), { expires: 1, path: '/' });

            setAuthToken();
            Cookies.set("userEmail", formData.email, { expires: 1, path: '/' });

            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenForgotPasswordModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); // Prevent form submission when clicking "Forgot password?"
        setOpenForgotPasswordModal(true);
    };

    const handleCloseForgotPasswordModal = () => {
        setOpenForgotPasswordModal(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            p={2}
            bgcolor="#f5f5f5"
        >
            <Box
                position="relative"
                width={{ xs: "100%", sm: "450px" }}
                bgcolor="white"
                borderRadius={3}
                boxShadow={3}
                p={4}
                sx={{ border: "1px solid #ddd" }}
            >
                {/* Close Button */}
                <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 10, right: 10, color: "secondary.main" }}
                    onClick={() => navigate("/")}
                >
                    <CloseIcon />
                </IconButton>

                {/* Logo and Heading */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <img src={logo} alt="Logo" style={{ height: 60, width: 60, marginBottom: 10 }} />
                    <Typography variant="h6" fontWeight={500}>
                        Welcome Back !
                    </Typography>
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <Typography variant="caption" fontWeight={500} mb={0.5} color="textPrimary">
                        Email*
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email"
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    {/* Password */}
                    <Typography variant="caption" fontWeight={500} mb={0.5} color="textPrimary">
                        Password*
                    </Typography>
                    <Box position="relative" mb={2}>
                        <TextField
                            fullWidth
                            required
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your Password"
                            size="small"
                        />
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                            }}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </Box>

                    {/* Forgot password link */}
                    <Box textAlign="right" mb={2}>
                        <MuiLink
                            component="button"
                            variant="caption"
                            color="secondary"
                            underline="none"
                            sx={{ fontWeight: 500, cursor: "pointer" }}
                            onClick={handleOpenForgotPasswordModal}
                        >
                            Forgot password?
                        </MuiLink>
                    </Box>

                    {/* ✅ Reused Submit Button */}
                    <Button type="submit" disabled={isSubmitting}>
                        Log In
                    </Button>
                </form>

                {/* Footer Link */}
                <Box mt={3} textAlign="center">
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        <MuiLink
                            component={Link}
                            to="/signup"
                            color="secondary"
                            underline="none"
                            sx={{ fontWeight: 500 }}
                        >
                            Sign Up
                        </MuiLink>
                    </Typography>
                </Box>

                {/* Forgot Password Modal */}
                <Modal open={openForgotPasswordModal} onClose={handleCloseForgotPasswordModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" component="h2" mb={2}>
                            Forgot Password
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            If you've forgotten your password, please contact our support team at
                            skillpeakripe@gmail.com. Send an email from your registered email address
                            with a subject line “Password Reset Request,” and our team will provide you
                            with a temporary password and instructions.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleCloseForgotPasswordModal}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Login;