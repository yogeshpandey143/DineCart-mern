import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: Object,
        required: true,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },

  address: {
    type: Object,
    required: true,
    ref: "address",
  },

  status: {
    type: String,
    default: "order placed",
  },
  paymentType: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: String,
    required: true,
    ref: "user",
  },
} ,{timestamps:true});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
