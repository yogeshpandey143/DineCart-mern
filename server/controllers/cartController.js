import User from "../models/user.js";
// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
