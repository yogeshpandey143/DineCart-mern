import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized User!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      // Attach userId to req directly
      req.userId = decoded.id;
      next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized User!" });
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authUser;
