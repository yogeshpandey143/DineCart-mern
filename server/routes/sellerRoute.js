import express from "express";
import {sellerLogin, checkAuthSeller, logoutSeller} from "../controllers/sellerController.js";
import authSeller from "../middleware/authSeller.js";
const sellerRoute = express.Router();

sellerRoute.post("/login", sellerLogin);
sellerRoute.get("/is-auth",authSeller, checkAuthSeller);
sellerRoute.get("/logout",authSeller, logoutSeller);

export default sellerRoute;