import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Layout from '../../components/layout/Layout';

const Products = () => {
  // Mock product data
  const products = [
    { id: 1, name: 'Hydrating Face Cream', category: 'Skincare', price: '$24.99', stock: 45, sales: 120 },
    { id: 2, name: 'Matte Lipstick', category: 'Makeup', price: '$14.99', stock: 78, sales: 210 },
    { id: 3, name: 'Volumizing Mascara', category: 'Makeup', price: '$12.99', stock: 32, sales: 95 },
    { id: 4, name: 'Anti-Aging Serum', category: 'Skincare', price: '$34.99', stock: 23, sales: 67 },
    { id: 5, name: 'Sunscreen SPF 50', category: 'Skincare', price: '$19.99', stock: 56, sales: 145 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'sales', headerName: 'Sales', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
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
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search products..."
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
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </Paper>
    </Layout>
  );
};

export default Products;