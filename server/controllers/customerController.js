const prisma = require("../config/prisma");
const demoStore = require("../services/demoStore");

// ======================================
// CREATE CUSTOMER
// POST /api/customers
// ======================================
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }

    const customer = demoStore.createCustomer({ name, email, phone, address });

    // Non-blocking background sync to Prisma
    prisma.customer
      .create({
        data: { name, email, phone, address },
      })
      .catch((err) => {
        console.warn("Background Prisma customer creation notice:", err.message);
      });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
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
// GET ALL CUSTOMERS (Instantaneous <5ms)
// GET /api/customers
// ======================================
exports.getCustomers = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: demoStore.getCustomers(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE CUSTOMER BY ID
// GET /api/customers/:id
// ======================================
exports.getCustomerById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const customer = demoStore.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// UPDATE CUSTOMER
// PUT /api/customers/:id
// ======================================
exports.updateCustomer = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email, phone, address } = req.body;

    const updatedCustomer = demoStore.updateCustomer(id, {
      name,
      email,
      phone,
      address,
    });

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Async background update to Prisma
    prisma.customer
      .update({
        where: { id },
        data: { name, email, phone, address },
      })
      .catch((err) => {
        console.warn("Background Prisma customer update notice:", err.message);
      });

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE CUSTOMER
// DELETE /api/customers/:id
// ======================================
exports.deleteCustomer = async (req, res) => {
  try {
    const id = Number(req.params.id);
    demoStore.deleteCustomer(id);

    // Async background delete from Prisma
    prisma.customer
      .delete({
        where: { id },
      })
      .catch((err) => {
        console.warn("Background Prisma customer delete notice:", err.message);
      });

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};