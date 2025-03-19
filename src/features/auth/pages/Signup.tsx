"use client";
import * as React from "react";
import {
  Box,
  Typography,
  InputAdornment,
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



const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    mobile: "",
    password: "",
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData.email, formData.mobile, formData.password);
      toast.success("Signup successful!");
      navigate("/login");
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
          sx={{ position: "absolute", top: 16, right: 16,color: "secondary.main" }}
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
          {/* Name */}
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
      border: "1px solid #ccc",
      borderRadius: 1,
      fontSize: "14px",
      outline: "none",
    }}
  />
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
    onChange={handleChange}
    placeholder="Enter your Mobile Number"
    required
    sx={{
      width: "100%",
      px: 2,
      py: 1,
      border: "1px solid #ccc",
      borderRadius: 1,
      fontSize: "14px",
      outline: "none",
    }}
  />
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
        border: "1px solid #ccc",
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
