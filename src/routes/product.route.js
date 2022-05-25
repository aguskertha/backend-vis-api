const router = require('express').Router();
const {getProducts, createProduct, deleteProducts, deleteProductByID, getProductByID} = require('./../controllers/product.controller')
const {singleUploadFile, multiUploadFile} = require('../middleware/upload-image');

router.get('/', getProducts);
router.get('/:productID', getProductByID);
router.post('/', singleUploadFile, createProduct);
router.delete('/', deleteProducts);
router.delete('/:productID', deleteProductByID);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Product
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - name
 *              - description
 *              - price
 *              - size
 *              - image  
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              price:
 *                  type: int
 *              size:
 *                  type: string
 *              image:
 *                  type: file
 */

/**
 * @swagger
 * /api/v1/products/:
 *  post:
 *      summary: Create Product
 *      tags: [Product]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          description:
 *                              type: string
 *                          price:
 *                              type: int
 *                          size:
 *                              type: string
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Successfully!
 *          400:
 *              description: Something wrong!
 */


/**
 * @swagger
 * /api/v1/products/:
 *  get:
 *      summary: Get All Product
 *      tags: [Product]
 * 
 *      responses:
 *          200:
 *              description: Successfully!
 *          400:
 *              description: Something wrong!
 */

/**
 * @swagger
 * /api/v1/products/{productID}:
 *  delete:
 *      summary: Delete Product By ID
 *      tags: [Product]
 *      parameters:
 *          -   in: path
 *              name: productID
 *              schema:
 *                  type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Successfully!
 *          400:
 *              description: Something wrong!
 */

/**
 * @swagger
 * /api/v1/products/:
 *  delete:
 *      summary: Delete Products
 *      tags: [Product]
 *  
 *      responses:
 *          200:
 *              description: Successfully!
 *          400:
 *              description: Something wrong!
 */


/**
 * @swagger
 * /api/v1/products/{productID}:
 *  get:
 *      summary: Get Product By ID
 *      tags: [Product]
 *      parameters:
 *          -   in: path
 *              name: productID
 *              schema:
 *                  type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Successfully!
 *          400:
 *              description: Something wrong!
 */