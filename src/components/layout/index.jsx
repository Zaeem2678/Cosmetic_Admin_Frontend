import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Box, 
  Avatar 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon, 
  Settings as SettingsIcon 
} from '@mui/icons-material';

const Topbar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Cosmetic Store Admin
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" sx={{ ml: 1 }}>
            <SettingsIcon />
          </IconButton>
          <Avatar 
            alt="Admin User" 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 40, height: 40, ml: 2 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;