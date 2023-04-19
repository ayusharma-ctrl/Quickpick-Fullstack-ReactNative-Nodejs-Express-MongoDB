import { Product } from "../models/product.js";
import cloudinary from 'cloudinary'
import fs from 'fs'


// method to add a new product
export const addProduct = async (req, res) => {
    try {
        const { pname, pdescription, pcategory, psubcategory, pprice, pdiscount, pstock } = req.body
        await Product.create({ pname, pdescription, pcategory, psubcategory, pprice, pdiscount, pstock })
        res.status(201).json({ success: true, message: "Product Added" })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// method to edit a product details
export const updateProduct = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
        const { pname, pdescription, pcategory, psubcategory, pprice, pdiscount, pstock } = req.body
        product.pname = pname;
        product.pdescription = pdescription;
        product.pcategory = pcategory;
        product.psubcategory = psubcategory;
        product.pprice = pprice;
        product.pdiscount = pdiscount;
        product.pstock = pstock;
        await product.save();
        res.status(200).json({ success: true, message: "Product Details Updated" })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// method to delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
        for (let i = 0; i < product.pimage.length; i++) {
            await cloudinary.uploader.destroy(product.pimage[i].public_id)
        }
        await product.deleteOne();
        res.status(200).json({ success: true, message: "Product Deleted!" })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message })
    }
}

// method to get all the products
export const allProducts = async (req, res) => {
    try {
        const allproducts = await Product.find()
        res.json({
            success: true,
            products: allproducts
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}


// method to get all the products by category name
export const allProductsCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const allproducts = await Product.find({ pcategory: category })
        if (!allProducts) {
            return res.status(404).json({ success: false, message: "No Product found!" })
        }
        res.json({
            success: true,
            products: allproducts
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}


// method to get all the products by sub-category name
export const allProductsSubCategory = async (req, res) => {
    try {
        const { subcategory } = req.params;
        const allproducts = await Product.find({ psubcategory: subcategory })
        if (!allProducts) {
            return res.status(404).json({ success: false, message: "No Product found!" })
        }
        res.json({
            success: true,
            products: allproducts
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}


// method to get a particular product details
export const aProduct = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
        res.json({
            success: true,
            product: product
        })
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
}


//method to add images to an existing product
export const addProductImage = async (req, res) => {
    try {
        const { productID } = req.params
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" })
        }
        const image = req.files.image.tempFilePath;
        const myCloud = await cloudinary.uploader.upload(image, {
            folder: "QuickPick Products"
        })
        fs.rmSync("./tmp", { recursive: true });
        product.pimage.push({ public_id: myCloud.public_id, url: myCloud.secure_url })
        await product.save()
        res.status(200).json({
            success: true,
            message: "Product Image Added Successfully"
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}