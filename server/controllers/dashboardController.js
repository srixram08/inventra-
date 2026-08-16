const demoStore = require("../services/demoStore");

// ======================================
// Dashboard Summary (<5ms instant response)
// ======================================
exports.getDashboardSummary = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: demoStore.getDashboardSummary(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Revenue Analytics (<5ms instant response)
// ======================================
exports.getRevenueAnalytics = async (req, res) => {
  try {
    const summary = demoStore.getDashboardSummary();
    return res.json({
      success: true,
      data: {
        today: 185000,
        week: 639800,
        month: summary.totalSales,
        year: summary.totalSales * 4,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Sales Chart (<5ms instant response)
// ======================================
exports.getSalesChart = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: demoStore.getSalesChart(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Purchase Chart (<5ms instant response)
// ======================================
exports.getPurchaseChart = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: [
        { month: "Jan", purchases: 970000 },
        { month: "Feb", purchases: 555000 },
        { month: "Mar", purchases: 420000 },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Inventory Status (<5ms instant response)
// ======================================
exports.getInventoryStatus = async (req, res) => {
  try {
    const products = demoStore.getProducts();
    const lowStock = products.filter((p) => Number(p.stock) <= 10).length;
    return res.json({
      success: true,
      data: {
        totalProducts: products.length,
        lowStockProducts: lowStock,
        healthyStockProducts: Math.max(0, products.length - lowStock),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Low Stock Products (<5ms instant response)
// ======================================
exports.getLowStockProducts = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: demoStore.getLowStock(10),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Recent Sales (<5ms instant response)
// ======================================
exports.getRecentSales = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: demoStore.getRecentSales(5),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Recent Purchases (<5ms instant response)
// ======================================
exports.getRecentPurchases = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: demoStore.getPurchases().slice(0, 5),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};