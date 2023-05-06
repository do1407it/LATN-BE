import express from "express";
import { getProducts, getCustomers, createProduct } from "../controllers/client.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/product/create", createProduct);
router.get("/customers", getCustomers);

export default router;