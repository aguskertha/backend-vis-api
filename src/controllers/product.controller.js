const ObjectID = require('mongodb').ObjectId;
const Product = require('./../models/product.model')
const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const distance = require('euclidean-distance')
const FormData = require('form-data');
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: "http://localhost:8000/api/"});
const {Base64} = require('js-base64');

const getProducts = async (req, res, next) => {
    try{
        const products = await Product.find();
        res.json(products)
    }
    catch(error){
        res.status(400).json({message: error.toString()})
    }
}

const getNearestProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        const productKey = products[5]
        console.log(productKey.name)
        let filteredProducts = []
        products.forEach(product => {
            let newProduct = JSON.parse(JSON.stringify(product));
            const dist = distance(newProduct.embedding, productKey.embedding)
            newProduct.distance = dist
            newData = {
                name: newProduct.name,
                dist: newProduct.distance
            }
            filteredProducts.push(newData)
        });
        filteredProducts.sort(function(a, b) {
            return a.dist - b.dist;
        });
        res.json(filteredProducts.sort())
    } catch (error) {
        res.status(400).json({message: error.toString()})
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

        const {name, description, price, size, embedding} = req.body;
        const product = {name, description, price, size, imagePath: url, embedding};
        const newProduct = new Product(product);
        await newProduct.save();
        res.json(newProduct)
    }
    catch(error){
        res.status(400).json({message: error.toString()})
    }
}
const createQuery = async (req, res, next) => {
    try{
        fs.access("./public/images/", (error) => {
            if (error) {
                fs.mkdirSync("./public/images/");
            }
        });
        const { buffer, originalname } = req.file;
        const data = {
            filename: originalname,
            buffer64: Base64.encode(buffer)
        }
        result = await axios.post('/query', {
            method: 'POST',
            data: data
        });
        embedding = result.data
        if(embedding){
            const products = await Product.find();
            let filteredProducts = []
            products.forEach(product => {
                let newProduct = JSON.parse(JSON.stringify(product));
                const dist = distance(newProduct.embedding, embedding)
                newProduct.distance = dist
                newData = {
                    _id: newProduct._id,
                    name: newProduct.name,
                    description: newProduct.description,
                    price: newProduct.price,
                    size: newProduct.size,
                    distance: newProduct.distance
                }
                filteredProducts.push(newData)
            });
            filteredProducts.sort(function(a, b) {
                return a.distance - b.distance;
            });
            res.json(filteredProducts.sort())
        }
    }
    catch(error){
        res.status(400).json({message: error.toString()})
    }
}

const getProductByID = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const product = await Product.findOne({_id: ObjectID(productID)})
        if(!product){
            throw 'Product not found!'
        }
        res.json(product)
    } catch (error) {
        res.status(400).json({message: error.toString()})
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
        res.status(400).json({message: error.toString()})
    }
}

const postDummy = async (req, res, next) => {
    try {
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}
module.exports = {
    getProducts,
    createProduct,
    deleteProductByID,
    deleteProducts,
    getProductByID,
    postDummy,
    getNearestProducts,
    createQuery
}