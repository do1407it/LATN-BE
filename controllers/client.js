import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";

// PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stat,
                };
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(409).json({ success: false, error: error.message });
    }
};

// CUSTOMERS
export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
