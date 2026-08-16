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

// ==============================
// Default Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to Inventra ERP API",
    version: "1.0.0",
  });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Export App
// ==============================

module.exports = app;