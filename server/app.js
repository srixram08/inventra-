require("dotenv/config");

const express = require("express");
const cors = require("cors");

const app = express();


// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Routes
// ==============================

// Authentication
const authRoutes = require("./routes/authRoutes");

// Protected Test Route
const testRoutes = require("./routes/testRoutes");

// Category
const categoryRoutes = require("./routes/categoryRoutes");

// Product
const productRoutes = require("./routes/productRoutes");

// Supplier
const supplierRoutes = require("./routes/supplierRoutes");

// Customer
const customerRoutes = require("./routes/customerRoutes");

// Inventory
const inventoryRoutes = require("./routes/inventoryRoutes");

// Purchase
const purchaseRoutes = require("./routes/purchaseRoutes");

// Sales
const saleRoutes = require("./routes/saleRoutes");

// Dashboard (Phase 8)
const dashboardRoutes = require("./routes/dashboardRoutes");

// AI Assistant & Monitoring
const aiRoutes = require("./routes/aiRoutes");

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/products", productRoutes);

app.use("/api/suppliers", supplierRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/purchases", purchaseRoutes);

app.use("/api/sales", saleRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

const path = require("path");

// ==============================
// Serve Frontend in Production / Render
// ==============================
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to Inventra ERP API",
    version: "1.0.0",
  });
});

// Fallback to React index.html for SPA routes (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.status(200).json({
        success: true,
        message: "🚀 Inventra ERP Backend API is running.",
      });
    }
  });
});

// ==============================
// Export App
// ==============================

module.exports = app;