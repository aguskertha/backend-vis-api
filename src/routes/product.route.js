const router = require('express').Router();
const {getProducts, createProduct, deleteProducts, deleteProductByID, getProductByID, postDummy, getNearestProducts, createQuery} = require('./../controllers/product.controller')
const {singleUploadFile, multiUploadFile} = require('../middleware/upload-image');

router.get('/', getProducts);
router.get('/nearest', getNearestProducts);
router.get('/:productID', getProductByID);
router.post('/', singleUploadFile, createProduct);
router.post('/query', singleUploadFile, createQuery);
router.delete('/', deleteProducts);
router.delete('/:productID', deleteProductByID);
router.post('/dummy', singleUploadFile, postDummy);

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
 *              - embedding
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
 *              embedding:
 *                  type: Vector
 * 
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
 *                          embedding:
 *                              type: object
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