import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { resetPassword } from "../services/api"; 

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword(!showPassword);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await resetPassword(
        data.currentPassword,
        data.newPassword
      );
      console.log("Reset successful:", response);
      alert("Password reset successfully!");
      reset(); // Clear form
    } catch (error: any) {
      console.error("Reset error:", error);
      alert(error.message || "Password reset failed.");
    }
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
        width={{ xs: "100%", sm: "450px" }}
        bgcolor="white"
        borderRadius={3}
        boxShadow={3}
        p={4}
        sx={{ border: "1px solid #ddd" }}
      >
        <Typography variant="h6" fontWeight={600} mb={3} textAlign="center">
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            rules={{ required: "Current password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Current Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleVisibility}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Submit Button with color="primary" */}
          <Button type="submit" color="primary" variant="contained" fullWidth>
  Reset Password
</Button>

        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
