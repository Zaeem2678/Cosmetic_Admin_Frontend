import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Avatar,
  TextField,
  IconButton
} from '@mui/material';
import { 
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Layout from '../../components/layout/Layout';

const Customers = () => {
  // Mock customer data
  const customers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      phone: '(123) 456-7890', 
      orders: 5,
      joined: '2022-01-15',
      avatar: '/static/images/avatar/1.jpg'
    },
    { 
      id: 2, 
      name: 'Michael Brown', 
      email: 'michael@example.com', 
      phone: '(234) 567-8901', 
      orders: 2,
      joined: '2022-03-22',
      avatar: '/static/images/avatar/2.jpg'
    },
    { 
      id: 3, 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      phone: '(345) 678-9012', 
      orders: 8,
      joined: '2022-05-10',
      avatar: '/static/images/avatar/3.jpg'
    },
  ];

  const columns = [
    { 
      field: 'name', 
      headerName: 'Customer', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={params.row.avatar} sx={{ mr: 2 }} />
          {params.value}
        </Box>
      )
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'orders', headerName: 'Orders', width: 100 },
    { field: 'joined', headerName: 'Joined', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: () => (
        <Box>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained">
          Add Customer
        </Button>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search customers..."
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
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Layout>
  );
};

export default Customers;