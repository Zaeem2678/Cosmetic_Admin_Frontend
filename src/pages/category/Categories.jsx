import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.get(
        "http://localhost:4000/api/category/getAllCategories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories(res.data || []);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      if (editId) {
        await axios.patch(
          `http://localhost:4000/api/category/updateCategory/${editId}`,
          { name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/category/addCategory",
          { name },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setName("");
      setEditId(null);
      setError("");
      fetchCategories();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit category");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/api/category/deleteCategory/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setError("");
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete category");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat._id);
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">
          {editId ? "Update Category" : "Add Category"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, display: "flex", gap: 2 }}
        >
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3B2B86",
            }}
          >
            {editId ? "Update" : "Add"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Categories
        </Typography>

        {Array.isArray(categories) && categories.length > 0 ? (
          <List>
            {categories.map((cat) => (
              <ListItem
                key={cat._id}
                divider
                secondaryAction={
                  <>
                    <IconButton color="primary" onClick={() => handleEdit(cat)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Name: ${cat.name}`}
                  secondary={`ID: ${cat._id}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No categories found.</Typography>
        )}
      </Paper>
    </Layout>
  );
};

export default Categories;
