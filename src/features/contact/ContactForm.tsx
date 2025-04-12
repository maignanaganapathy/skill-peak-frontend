import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Navbar from '../landing/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useForm } from 'react-hook-form';
import { sendContactForm } from './services/api'; // Import the API function

// Define the type for form data
type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>(); // Using types with useForm

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactForm(data); 
      reset();
      navigate('/comingsoon'); 
    } catch (error) {
      console.error("Failed to send contact form", error);
    }
  };

  return (
    <>
      {/* Fixed Navbar at Top */}
      <Navbar />

      {/* Main Container with top padding to accommodate fixed Navbar */}
      <Box className="min-h-screen bg-[#f5f5f5] flex justify-center items-start relative px-4 pt-40 pb-10">
        {/* Wrapper for the content */}
        <Box position="relative">
          {/* White Form Paper */}
          <Paper elevation={3} sx={{ width: '700px', padding: 4, position: 'relative' }}>
            {/* Form aligned to the right */}
            <Box sx={{ width: '65%', marginLeft: 'auto' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" className="text-[#2F70B7] font-bold" sx={{ mb: 1 }}>
                  Get in Touch
                </Typography>
                <Typography className="text-gray-600" sx={{ mb: 3 }}>
                  Feel Free to drop us a line below!
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      fullWidth
                      variant="outlined"
                      size="small"
                      {...register('name', { required: 'Name is required' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
  <TextField
    label="Phone"
    fullWidth
    variant="outlined"
    size="small"
    {...register('phone', {
      required: 'Phone is required',
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Phone number must be 10 digits',
      },
    })}
    error={!!errors.phone}
    helperText={errors.phone?.message}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    label="Email"
    fullWidth
    variant="outlined"
    size="small"
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
    })}
    error={!!errors.email}
    helperText={errors.email?.message}
  />
</Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      fullWidth
                      multiline
                      rows={2}
                      variant="outlined"
                      {...register('message', { required: 'Message is required' })}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="flex justify-center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#1E4D92',
                          fontWeight: 'bold',
                          fontSize: '18px',
                          width: '130px',
                          borderRadius: 13,
                        }}
                        type="submit"
                      >
                        SEND
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>

            {/* Blue Contact Info Card (Hidden on small screens) */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Paper
                elevation={6}
                sx={{
                  position: 'absolute',
                  bottom: '15%',
                  left: -90,
                  width: 260,
                  height: 280,
                  padding: 2,
                  backgroundColor: '#2F70B7',
                  color: 'white',
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  align="center"
                  gutterBottom
                  mb={4}
                >
                  Contact Us
                </Typography>

                <Box display="flex" alignItems="flex-start" gap={2} mb={2} pl={4}>
                  <LocationOnIcon />
                  <Box>
                    <Typography fontSize={14}>Location</Typography>
                    <Typography fontSize={14}>Chennai</Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="flex-start" gap={2} mb={2} pl={4}>
                  <PhoneIcon />
                  <Box>
                    <Typography fontSize={14}>Phone</Typography>
                    <Typography fontSize={14}>+91 9962514135</Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="flex-start" gap={2} mb={2} pl={4}>
                  <EmailIcon />
                  <Box>
                    <Typography fontSize={14}>Email</Typography>
                    <Typography fontSize={14}>training@goripe.com</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ContactForm;
