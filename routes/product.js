import express from 'express';
import { aProduct, addProduct, addProductImage, allProducts, allProductsCategory, allProductsSubCategory, deleteProduct, updateProduct } from '../controllers/product.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

// api's--->
//api to add a new product
router.post("/new", isAuthenticated, addProduct)

//api to see all products
router.get("/all", isAuthenticated, allProducts)

//api to see all products by category
router.get("/:category", isAuthenticated, allProductsCategory)

//api to see all products by subcategory
router.get("/:subcategory", isAuthenticated, allProductsSubCategory)

//api to see an existing product
router.get("/:productID", isAuthenticated, aProduct)

//api to update an existing product
router.put("/:productID", isAuthenticated, updateProduct)

//api to delete an existing product
router.delete("/:productID", isAuthenticated, deleteProduct)

//api to add images to an existing product
router.post("/:productID", isAuthenticated, addProductImage)


export default router;