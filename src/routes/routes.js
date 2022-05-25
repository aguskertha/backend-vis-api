const router = require('express').Router();
const productRouter = require('./product.route')
const {swaggerDocs, swaggerUi} = require('./../utils/docs');
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use('/products', productRouter);
module.exports = router;