const jwt = require("jsonwebtoken");

const FALLBACK_SECRETS = [
  process.env.JWT_SECRET,
  "inventra_secure_jwt_secret_key_2026",
  "secret",
].filter(Boolean);

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Demo token bypass for fast offline tests
    if (
      token.startsWith("demo-token") ||
      token.startsWith("demo_") ||
      token === "demo"
    ) {
      req.user = {
        id: 1,
        email: "sriram@example.com",
        role: "ADMIN",
        name: "SRIRAM S (Admin)",
      };
      return next();
    }

    // Try verifying against secrets
    let decoded = null;
    for (const secret of FALLBACK_SECRETS) {
      try {
        decoded = jwt.verify(token, secret);
        if (decoded) break;
      } catch (err) {
        // try next secret
      }
    }

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = verifyToken;