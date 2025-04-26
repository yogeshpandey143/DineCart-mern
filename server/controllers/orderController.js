import Product from "../models/product.js";
import Order from "../models/order.js";
// Place Order COD : api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid Data!" });
    }

    // calulate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.price * item.quantity;
    }, 0);

    // Add tex charge 2%
    amount += amount * 0.02;

    const newOrder = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentTppe: "COD",
    });

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Order By User ID : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Orders(for seller/admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
    try {

      const orders = await Order.find({
      
        $or: [{ paymentType: "COD" }, { isPaid: true }],
      })
        .populate("items.product address").sort({ createdAt: -1 });
  
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  