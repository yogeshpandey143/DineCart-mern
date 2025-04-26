import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
  try {
    const sellerToken = req.cookies?.sellerToken;

    if (!sellerToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token using the SELLER_SECRET
    const decoded = jwt.verify(sellerToken, process.env.SELLER_SECRET);

    // Check if the email in token matches the predefined seller email
    if (decoded?.email !== process.env.SELLER_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized seller",
      });
    }

    // Attach seller info to request (if needed)
    req.seller = decoded;

    next();
  } catch (error) {
    console.error("AuthSeller JWT Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authSeller;
