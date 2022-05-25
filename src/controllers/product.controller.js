const ObjectID = require('mongodb').ObjectId;
const Product = require('./../models/product.model')

const getProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        res.json(products)
    }
    catch(err){
        res.status(400).json({message: err})
    }
}

const createProduct = async (req, res, next) => {
    try{
        const {name, description, price, size} = req.body;
        const product = {name, description, price, size};
        const newProduct = new Product(product);
        await newProduct.save();
        res.json(newProduct)
    }
    catch(err){
        res.status(400).json({message: err})
    }
}

module.exports = {
    getProducts,
    createProduct
}