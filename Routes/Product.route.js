const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');
const { handleErrorAsync } = require('../utils/errorHandler');

//Get a list of all products

// Un comment below is other way of handling
// router.get('/', handleErrorAsync(async (req, res, next) => { await ProductController.getAllProducts(req, res, next); }));

router.get('/', ProductController.getAllProducts);

//Create a new product
router.post('/', ProductController.createNewProduct);

//Get a product by id
router.get('/:id', ProductController.findProductById);

//Update a product by id
router.patch('/:id', ProductController.updateAProduct);

//Delete a product by id
router.delete('/:id', ProductController.deleteAProduct);

module.exports = router;
