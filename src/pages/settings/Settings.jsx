import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid
} from '@mui/material';
import Layout from '../../components/layout/Layout';

const Settings = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [currency, setCurrency] = React.useState('USD');
  const [notifications, setNotifications] = React.useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Settings</Typography>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="Store" />
          <Tab label="Notifications" />
          <Tab label="Security" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {tabValue === 0 && (
          <Box component="form">
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Admin Name"
                  defaultValue="John Doe"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="admin@example.com"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box component="form">
            <Typography variant="h6" gutterBottom>
              Store Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Store Name"
                  defaultValue="Cosmetic Store"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Store Address"
                  multiline
                  rows={3}
                  defaultValue="123 Beauty St, Cosmetic City"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 2 && (
          <Box component="form">
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                  }
                  label="Enable Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="New Order Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Low Stock Alerts"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 3 && (
          <Box component="form">
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default Settings;