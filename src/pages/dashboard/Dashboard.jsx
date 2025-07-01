import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  ShoppingCart as ProductsIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Layout from "../../components/layout/Layout";
import axios from "axios";

// Styled Card
const GradientPaper = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${color} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[6],
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[10],
  },
}));

// Stat Card Component
const StatCard = ({ icon, title, value, color, progress, trend }) => {
  return (
    <GradientPaper color={color}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ opacity: 0.8, letterSpacing: 1 }}
          >
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 1 }}>
            {value}
          </Typography>
          {progress && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  flexGrow: 1,
                  height: 8,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "white",
                  },
                }}
              />
              <Typography variant="caption" sx={{ ml: 1, fontWeight: 600 }}>
                {progress}%
              </Typography>
            </Box>
          )}
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                mt: 1,
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 32 } })}
        </Box>
      </Box>
    </GradientPaper>
  );
};

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    mostSellingProducts: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/product/summary"
        );
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };

    fetchSummary();
  }, []);

  const stats = [
    {
      icon: <ProductsIcon />,
      title: "TOTAL PRODUCTS",
      value: summary.totalProducts,
      color: "#4CAF50",
      progress: 88,
      trend: "+15.3%",
    },
    {
      icon: <StarIcon />,
      title: "MOST SELLING PRODUCTS",
      value: summary.mostSellingProducts,
      color: "#FF5722",
      progress: 90,
      trend: "+20.1%",
    },
  ];

  return (
    <Layout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "text.primary",
          mb: 4,
          letterSpacing: 0.5,
        }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
