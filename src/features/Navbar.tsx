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
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../context/PermissionsContext';
import { Permissions } from '../constants/Permissions';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LockResetIcon from '@mui/icons-material/LockReset';

interface NavbarProps {
  title: string;
  homepage?: boolean;
  onLogout?: () => void;
  onSubmit?: () => void;
  showSubmit?: boolean;
  isComplete?: boolean;
  isScoreView?: boolean;
  showBack?: boolean;
  teamName?: string;
  tagline?: string;
  projectId?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  homepage = false,
  onLogout,
  onSubmit,
  showSubmit = false,
  isComplete = false,
  isScoreView = false,
  showBack = false,
  teamName,
  tagline,
  projectId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { checkHasPermission } = usePermissions();

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

  const handleTeamDashboardClick = () => {
    handleClose();
    navigate(`/project/${projectId}/dashboard`);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'primary.main',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '80px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showBack && (
            <IconButton
              onClick={handleBackClick}
              color="inherit"
              aria-label="go back"
              sx={{ mr: 1 }}
            >
              <ChevronLeftIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
          <IconButton
            onClick={handleLogoClick}
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={Logo}
                alt="Logo"
                style={{ height: 50, marginRight: 9 }}
              />
            </Box>
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '60%',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              wordWrap: 'break-word',
            }}
          >
            {title}
          </Typography>
          {teamName && tagline && (
            <div className="flex flex-col items-center mt-1">
              <span style={{ wordWrap: 'break-word', fontWeight: 600 }}>
                {teamName}
              </span>
              <span style={{ wordWrap: 'break-word', fontSize: '0.8rem' }}>
                {tagline}
              </span>
            </div>
          )}
        </Box>

        {homepage ? (
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        ) : showSubmit ? (
          <Button
            onClick={onSubmit}
            disabled={!isComplete}
            variant="contained"
            sx={{
              height: { xs: 32, sm: 36 },
              width: { xs: 90, sm: 106 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 800,
              borderRadius: '12px',
              bgcolor: isComplete ? 'secondary.main' : 'grey.400',
              '&:hover': {
                bgcolor: isComplete ? 'secondary.dark' : 'grey.400',
              },
            }}
            title={
              !isComplete
                ? 'Please answer all questions before submitting'
                : 'Submit assessment'
            }
          >
            SUBMIT
          </Button>
        ) : (
          <Box sx={{ width: 48 }} />
        )}

        {homepage && (
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
              {checkHasPermission(Permissions.MANAGE_QUIZ) && (
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleMenuItemClick('/quizzes')}>
                    <ListItemIcon>
                      <QuizIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Manage Quiz" />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleMenuItemClick('/reset-password')}>
                  <ListItemIcon>
                    <LockResetIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Reset Password" />
                </ListItemButton>
              </ListItem>
              {/* <Divider /> */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleClose();
                    if (onLogout) onLogout();
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

