const router = require('express').Router();
const {getProducts, createProduct, deleteProducts, deleteProductByID} = require('./../controllers/product.controller')
const {singleUploadFile, multiUploadFile} = require('../middleware/upload-image');

router.get('/', getProducts);
router.post('/', singleUploadFile, createProduct);
router.delete('/', deleteProducts);
router.delete('/:productID', deleteProductByID);

module.exports = router;