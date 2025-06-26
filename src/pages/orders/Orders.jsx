import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  TextField,
  IconButton
} from '@mui/material';
import { 
  Search as SearchIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Layout from '../../components/layout/Layout';

const Orders = () => {
  // Mock order data
  const orders = [
    { 
      id: '#ORD-1001', 
      customer: 'Sarah Johnson', 
      date: '2023-05-15', 
      amount: '$89.97', 
      status: 'Completed',
      items: 3
    },
    { 
      id: '#ORD-1002', 
      customer: 'Michael Brown', 
      date: '2023-05-16', 
      amount: '$45.98', 
      status: 'Processing',
      items: 2
    },
    { 
      id: '#ORD-1003', 
      customer: 'Emily Davis', 
      date: '2023-05-17', 
      amount: '$120.45', 
      status: 'Shipped',
      items: 5
    },
    { 
      id: '#ORD-1004', 
      customer: 'Robert Wilson', 
      date: '2023-05-18', 
      amount: '$34.99', 
      status: 'Pending',
      items: 1
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 180 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => {
        let color;
        switch(params.value) {
          case 'Completed': color = 'success'; break;
          case 'Processing': color = 'info'; break;
          case 'Shipped': color = 'warning'; break;
          default: color = 'default';
        }
        return <Chip label={params.value} color={color} size="small" />;
      }
    },
    { field: 'items', headerName: 'Items', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: () => (
        <IconButton color="primary">
          <ViewIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Orders</Typography>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search orders..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, mr: 2 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
          <Button variant="outlined" sx={{ mr: 1 }}>
            Filter
          </Button>
        </Box>
      </Paper>
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Layout>
  );
};

export default Orders;