import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from './assets/whitelogo.svg'; // Import your logo
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route: string) => {
    handleClose();
    navigate(route);
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Center AppBar content */}
      <Toolbar sx={{ minHeight: '80px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Distribute items in Toolbar */}
        {/* Logo on the left */}
        <IconButton
          onClick={handleLogoClick}
          edge="start"
          color="inherit"
          aria-label="logo"
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: 50, marginRight: 9 }} />
          </Box>
        </IconButton>

        {/* Centered "Dashboard" Text */}
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', fontSize: '1.5rem', }}
        >
          DASHBOARD
        </Typography>

        {/* Hamburger Menu on the right */}
        <IconButton
          size="large"
          edge="end" // Changed from 'start' to 'end'
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick('/comingsoon')}> {/* Updated route */}
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Team Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick('/quizzes')}>
                <ListItemIcon>
                  <QuizIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Manage Quiz" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => { handleClose(); if (onLogout) onLogout(); }}>
                <ListItemIcon>
                  <ExitToAppIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;