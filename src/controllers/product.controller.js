const ObjectID = require('mongodb').ObjectId;
const Product = require('./../models/product.model')
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const getProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        res.json(products)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}

const createProduct = async (req, res, next) => {
    try{
        fs.access("./public/images/", (error) => {
            if (error) {
                fs.mkdirSync("./public/images/");
            }
        });
        const { buffer, originalname } = req.file;
        const fileName = originalname.replace(/\s/g, '');
        const filterFileName = fileName.replace(/\.[^/.]+$/, "");
        const date = moment().format('YYYY-MM-DD-hh-mm-ss');
        const ref = date+'-'+filterFileName.toLowerCase()+'.jpg';
        await sharp(buffer)
            .webp({ quality: 20 })
            .toFile("./public/images/" + ref);
        const url = `/public/images/${ref}`;

        const {name, description, price, size} = req.body;
        const product = {name, description, price, size, imagePath: url};
        const newProduct = new Product(product);
        await newProduct.save();
        res.json(newProduct)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}

const deleteProductByID = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw "Product not found!"
        }
        await Product.deleteOne({_id: ObjectID(productID)})
        res.json({message: 'Product deleted successfully!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteProducts = async (req, res, next) => {
    try {
        await Product.deleteMany()
        res.json({message: 'Products deleted successfully!'})
    } catch (error) {
        res.status(400).json({message: error})
    }
}

module.exports = {
    getProducts,
    createProduct,
    deleteProductByID,
    deleteProducts
}