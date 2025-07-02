import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Layout from "../../components/layout/Layout";
import axios from "axios";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setModal({
        open: true,
        type: "error",
        message: "New Password and Confirm Password do not match.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      await axios.patch(
        "http://localhost:4000/api/admin/update-password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setModal({
        open: true,
        type: "success",
        message: "Your password has been changed successfully.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setModal({
        open: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Layout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Security Settings</Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleChangePassword}>
          <Typography variant="h6" gutterBottom>
            Update Password
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                error={
                  !!confirmNewPassword && confirmNewPassword !== newPassword
                }
                helperText={
                  !!confirmNewPassword && confirmNewPassword !== newPassword
                    ? "Passwords do not match"
                    : ""
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                alignContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#3B2B86",
                }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Modal Dialog for Success/Error */}
      <Dialog
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {modal.type === "success" && (
            <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 32 }} />
          )}
          {modal.type === "error" && (
            <HighlightOffIcon sx={{ color: "red", fontSize: 32 }} />
          )}
          {modal.type === "success" ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <Typography>{modal.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal({ ...modal, open: false })} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Settings;
