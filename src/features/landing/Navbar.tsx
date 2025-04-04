

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "flex-end",
  width: "100%",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
  marginRight: theme.spacing(3),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
}));

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate("/");
    setTimeout(() => {
      const aboutUsSection = document.getElementById("about-us-section");
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <StyledToolbar>
        <Box sx={{ display: "flex", gap: 3, alignItems: 'center' }}> {/* Added alignItems: 'center' */}
          <NavLink to="/">Home</NavLink>
          <Button onClick={handleAboutUsClick} style={{ fontWeight: "bold", color: 'inherit' }}>
            About Us
          </Button>
          <NavLink to="/contact">Contact Us</NavLink>
        </Box>
        <Box sx={{ display: "flex", gap: 3, ml: 4 }}>
          <AuthButton variant="contained" color="primary" onClick={() => navigate("/login")}>
            Login
          </AuthButton>
          <AuthButton variant="outlined" onClick={() => navigate("/signup")}>
            Sign up
          </AuthButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;