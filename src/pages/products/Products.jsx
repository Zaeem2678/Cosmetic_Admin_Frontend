import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../../components/layout/Layout";
import axios from "axios";

const Products = () => {
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [image, setImage] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:4000/api/product/getAllProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:4000/api/category/getAllCategories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category response:", res.data);
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `http://localhost:4000/api/product/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId?._id || "",
    });
    setOpenModal(true);
  };

  // Submit Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("categoryId", formData.categoryId);
      if (image) data.append("image", image);

      if (editMode && editProductId) {
        await axios.patch(
          `http://localhost:4000/api/product/updateProduct/${editProductId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:4000/api/product/addProduct", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setFormData({ name: "", description: "", price: "", categoryId: "" });
      setImage(null);
      setOpenModal(false);
      setEditMode(false);
      setEditProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Product Name", width: 200 },
    {
      field: "categoryId",
      headerName: "Category",
      width: 130,
      renderCell: (params) => params.row.categoryId?.name || "N/A",
    },
    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "sales", headerName: "Sales", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData({
              name: "",
              description: "",
              price: "",
              categoryId: "",
            });
            setImage(null);
            setEditMode(false);
            setOpenModal(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            placeholder="Search products..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, mr: 2 }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "action.active" }} />
              ),
            }}
          />
          <Button variant="outlined">Filter</Button>
        </Box>
      </Paper>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": {
              alignItems: "center",
            },
          }}
        />
      </Paper>

      {/* Add Product Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper sx={{ width: 500, p: 4, mx: "auto", mt: 10, position: "relative" }}>
          {/* Close (X) Button */}
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" mb={2}>
            {editMode ? "Edit Product" : "Add New Product"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              margin="normal"
              required
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>

            <Box mt={3}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Modal>
    </Layout>
  );
};

export default Products;
