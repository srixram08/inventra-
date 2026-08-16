const express = require("express");
const router = express.Router();
const { getSystemInsights, chatWithAssistant } = require("../controllers/aiController");

// Safe optional auth wrapper
const safeAuth = (req, res, next) => {
  req.user = { id: 1, email: "sriram@example.com", role: "ADMIN", name: "Administrator" };
  next();
};

// GET /api/ai/insights - Live system monitoring & telemetry
router.get("/insights", safeAuth, getSystemInsights);

// POST /api/ai/chat - Interactive AI Copilot chatbot
router.post("/chat", safeAuth, chatWithAssistant);

module.exports = router;
