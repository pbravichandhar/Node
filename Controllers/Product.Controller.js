const createError = require('http-errors');
const mongoose = require('mongoose');

const Product = require('../Models/Product.model');
const baseError = require('../utils/baseError');
const { getAllProductsService } = require('../Services/Product.Service');
const { handleServiceError } = require('../utils/errorHandler');

module.exports = {
  getAllProducts: async (req, res, next) => {
        const results = await Product.find({}, { __v: 0 });
        // Throwing Error Case 1 - From controller
        throw new baseError('No User', 200, 'Throwing from controller without try catch block', true)
  
        // Throwing Error Case 2 - From service
        // await getAllProductsService();
        
        res.send(results);

  },

  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  },

  updateAProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Product does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Product Id'));
      }

      next(error);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Product id'));
        return;
      }
      next(error);
    }
  }
};
