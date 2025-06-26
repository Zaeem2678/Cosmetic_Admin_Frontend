import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import Layout from '../../components/layout/Layout';

const Analytics = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Analytics</Typography>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Sales" />
          <Tab label="Products" />
          <Tab label="Customers" />
          <Tab label="Revenue" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              {tabValue === 0 && 'Sales Overview'}
              {tabValue === 1 && 'Top Products'}
              {tabValue === 2 && 'Customer Demographics'}
              {tabValue === 3 && 'Revenue Breakdown'}
            </Typography>
            <Box sx={{ height: 350, backgroundColor: '#f5f5f5' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Key Metrics
            </Typography>
            <Box sx={{ height: 350, backgroundColor: '#f5f5f5' }} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ height: 250, backgroundColor: '#f5f5f5' }} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Analytics;