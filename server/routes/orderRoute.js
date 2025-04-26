import express from "express";

import authUser from "../middleware/authUser.js";
import authSeller from "../middleware/authSeller.js";
import {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.get("/cod", authUser, placeOrderCOD);
orderRoute.get("/user", authUser, getUserOrders);
orderRoute.get("/seller", authSeller, getAllOrders);

export default orderRoute;
