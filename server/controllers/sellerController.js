import jwt from "jsonwebtoken";

// Seller login : api/seller/login
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      // Check if the email and password match the environment variables
      const sellerToken = jwt.sign({ email }, process.env.SELLER_SECRET, {
        expiresIn: "3h",
      });
      // Set the token in a cookie with secure and httpOnly flags
      res.cookie("sellerToken", sellerToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Adjust sameSite for production
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });

      return res
        .status(200)
        .json({ success: true, message: "Login successful" });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Error during seller login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Check Authenticated : /api/seller/is-auth
export const checkAuthSeller = async (req, res) => {
  const { sellerToken } = req.cookies; // Get the token from cookies

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(sellerToken, process.env.SELLER_SECRET);
    if (decodedToken.email === process.env.SELLER_EMAIL) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User!" });
    }
  } catch (error) {
    console.error("Error checking authenticated user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Logout Seller: /api/seller/logout

export const logoutSeller = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      // Ensure you are clearing "sellerToken"
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure secure flag is true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict", // Set SameSite flag
    });
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
