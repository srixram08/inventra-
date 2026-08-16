const express = require("express");
const router = express.Router();
const { getSystemInsights, chatWithAssistant } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/ai/insights - Live system monitoring & anomaly detection
router.get("/insights", authMiddleware, getSystemInsights);

// POST /api/ai/chat - Interactive AI Copilot assistant
router.post("/chat", authMiddleware, chatWithAssistant);

module.exports = router;
