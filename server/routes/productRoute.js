import express from "express";
import { upload } from "../config/multer.js";
import authSeller from "../middleware/authSeller.js";
import {
  addProduct,
  changeStock, // Corrected from changeStoke to changeStock
  productById,
  productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images"), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/:id", productById); // Assuming you're passing the product ID via URL params
productRouter.post("/stock", authSeller, changeStock); // Corrected function name

export default productRouter;
