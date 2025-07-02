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

const MostSellingProducts = () => {
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    productQuantity: "",
    categoryId: "",
  });
  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:4000/api/mostSalingProdoct/getTopMostSalingProduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cleanData = (res.data.mostSalingProducts || []).filter(
        (item) => item && item._id
      );

      setProducts(cleanData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
      setCategories(res.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `http://localhost:4000/api/mostSalingProdoct/deleteMostSalingProduct/${id}`,
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
      name: product.productName,
      productQuantity: product.quantity,
      categoryId: product.categoryId || "",
    });
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("productQuantity", formData.productQuantity);
      data.append("categoryId", formData.categoryId);
      if (image) data.append("image", image);

      if (editMode && editProductId) {
        await axios.patch(
          `http://localhost:4000/api/mostSalingProdoct/updateMostSalingProduct/${editProductId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/mostSalingProdoct/addMostSalingProduct",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setFormData({ name: "", productQuantity: "", categoryId: "" });
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
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "categoryName", headerName: "Category", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
        <Typography variant="h4">Most Selling Products</Typography>
        <Button
          sx={{
            backgroundColor: "#3B2B86",
          }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData({ name: "", productQuantity: "", categoryId: "" });
            setImage(null);
            setEditMode(false);
            setOpenModal(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Paper
          sx={{ width: 500, p: 4, mx: "auto", mt: 10, position: "relative" }}
        >
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
              label="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={formData.productQuantity}
              onChange={(e) =>
                setFormData({ ...formData, productQuantity: e.target.value })
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

export default MostSellingProducts;
