import express from "express";
import auth from "../middleware/auth.js";
import productController from "../controller/productController.js";

const productRoute = express.Router();

productRoute.post("/add",auth.authenticate,auth.authorization, productController.addProduct);
productRoute.get("/getAll", productController.getAllProduct);
productRoute.get("/:id",productController.getProductById);
productRoute.put("/:id",auth.authenticate,auth.authorization,productController.updateProduct);
productRoute.delete("/:id",auth.authenticate,auth.authorization,productController.deleteProduct);

export default productRoute;