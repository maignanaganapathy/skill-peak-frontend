import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../features/Navbar";
import Cookies from "js-cookie";

const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const email = Cookies.get("userEmail") || "";

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email not found. Please log in again.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            await resetPassword(email, currentPassword, newPassword);
            toast.success("Password reset successfully!");
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || error.error || "Failed to reset password.");
        }
    };

    return (
        <>
           <Navbar title="Reset Password" />

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                p={2}
                bgcolor="#f5f5f5"
            >
                <Box
                    width={{ xs: "100%", sm: "450px" }}
                    bgcolor="white"
                    borderRadius={3}
                    boxShadow={3}
                    p={4}
                    sx={{ border: "1px solid #ddd" }}
                >
                    <Typography variant="h6" fontWeight={500} textAlign="center" mb={3}>
                        Reset Your Password
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* Current Password */}
                        <Typography variant="caption" fontWeight={500}>
                            Current Password
                        </Typography>
                        <Box position="relative" mb={2}>
                            <TextField
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                size="small"
                            />
                        </Box>

                        {/* New Password */}
                        <Typography variant="caption" fontWeight={500}>
                            New Password
                        </Typography>
                        <Box position="relative" mb={2}>
                            <TextField
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                size="small"
                            />
                        </Box>

                        {/* Confirm Password */}
                        <Typography variant="caption" fontWeight={500}>
                            Confirm Password
                        </Typography>
                        <Box position="relative" mb={3}>
                            <TextField
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
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

                        <Button type="submit">Reset Password</Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default ResetPassword;
