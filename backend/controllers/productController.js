const Product = require("../models/product");

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });

    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deleteproduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteproduct) {
            return res.status(404).json({
                message: "unable to delete"
            })
        }
        return res.status(200).json({
            message: "product deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const updateproduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateproduct);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    };
}

exports.findProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "no product found"
            })
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}