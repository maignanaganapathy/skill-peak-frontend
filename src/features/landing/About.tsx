
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StatCard } from "./StatCard";

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

const Navbar: React.FC<{ aboutUsRef: React.RefObject<HTMLElement | null> }> = ({ aboutUsRef }) => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <StyledToolbar>
        <Box sx={{ display: "flex", gap: 3 }}>
          <NavLink to="/" style={{alignSelf: 'center'}}>Home</NavLink>
          <Button onClick={handleAboutUsClick} style={{ textDecoration: "none", color: "inherit", alignSelf: 'center' }}>
            About Us
          </Button>
          <NavLink to="/contact" style={{alignSelf: 'center'}}>Contact Us</NavLink>
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

export const About: React.FC = () => {
  const aboutUsRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Navbar aboutUsRef={aboutUsRef} />
      <section className="px-0 py-20 bg-white" ref={aboutUsRef}>
        <h2 className="mb-10 text-5xl font-bold text-center">ABOUT US</h2>
        <div className="flex gap-20 px-5 py-0 mx-auto my-0 max-w-[1200px] mt-24 max-md:flex-col max-md:gap-10 max-md:text-center">
          <div className="text-5xl font-extrabold leading-relaxed pl-20">
            <span>Welcome to</span>
            <br />
            <span className="text-blue-900">RIPE Skill Peak</span>
          </div>
          <div className="text-base font-medium max-w-[563px] ml-auto">
            <p>
              Since 1997, RIPE Consulting Services has been a global leader in training, coaching, and consulting, empowering individuals and organizations to unlock their true potential. With over 500 trusted clients across diverse industries and more than 1.5 million knowledge seekers trained through 2000+ transformative programs, we specialize in helping participants unlearn, learn, and relearn core concepts that drive 10X productivity.
            </p>
            <br />
            <p>
              Step into the future of learning with RIPE Skill Peak LMS, where we elevate your skills to new heights and ensure you achieve excellence every step of the way.
            </p>
          </div>
        </div>
        <div className="flex justify-between px-5 py-0 mx-auto mt-24 mb-0 max-w-[1200px] max-md:flex-wrap max-md:gap-5 max-md:justify-center">
          <StatCard number="500+" label="Happy Clients" />
          <StatCard number="23" label="Years of Quality" />
          <StatCard number="1.5M+" label="Knowledge Seekers Trained" />
          <StatCard number="10K+" label="Transformational Programs" />
        </div>
      </section>
    </>
  );
};

export default About;