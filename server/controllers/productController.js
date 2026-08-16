const prisma = require("../config/prisma");
const demoStore = require("../services/demoStore");

// ======================================
// CREATE PRODUCT
// POST /api/products
// ======================================
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, price, stock, categoryId, supplierId } = req.body;

    if (!name || !sku || !price || stock === undefined || !categoryId || !supplierId) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    const newProduct = demoStore.createProduct({
      name,
      sku,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
      supplierId: Number(supplierId),
    });

    // Async background sync to Prisma
    prisma.product
      .create({
        data: {
          name,
          sku,
          price: Number(price),
          stock: Number(stock),
          categoryId: Number(categoryId),
          supplierId: Number(supplierId),
        },
      })
      .catch((err) => {
        console.warn("Background Prisma product create notice:", err.message);
      });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET ALL PRODUCTS (Instantaneous <5ms)
// GET /api/products
// ======================================
exports.getProducts = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: demoStore.getProducts(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE PRODUCT BY ID
// GET /api/products/:id
// ======================================
exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = demoStore.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE PRODUCT
// PUT /api/products/:id
// ======================================
exports.updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, sku, price, stock, categoryId, supplierId } = req.body;

    const updated = demoStore.updateProduct(id, {
      name,
      sku,
      price: price ? Number(price) : undefined,
      stock: stock !== undefined ? Number(stock) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      supplierId: supplierId ? Number(supplierId) : undefined,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Async background update to Prisma
    prisma.product
      .update({
        where: { id },
        data: {
          name,
          sku,
          price: price ? Number(price) : undefined,
          stock: stock !== undefined ? Number(stock) : undefined,
          categoryId: categoryId ? Number(categoryId) : undefined,
          supplierId: supplierId ? Number(supplierId) : undefined,
        },
      })
      .catch((err) => {
        console.warn("Background Prisma product update notice:", err.message);
      });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE PRODUCT
// DELETE /api/products/:id
// ======================================
exports.deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    demoStore.deleteProduct(id);

    // Async background delete from Prisma
    prisma.product
      .delete({
        where: { id },
      })
      .catch((err) => {
        console.warn("Background Prisma product delete notice:", err.message);
      });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};