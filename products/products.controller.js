const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const productService = require('./product.service');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProductSchema, createProduct);
router.put('/:id', updateProductSchema, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

function getAllProducts(req, res, next) {
    productService.getAllProducts()
        .then(products => res.json(products))
        .catch(next);
}

function getProductById(req, res, next) {
    productService.getProductById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

function createProduct(req, res, next) {
    productService.createProduct(req.body)
        .then(() => res.json({ message: 'Product Created' }))
        .catch(next);
}

function updateProduct(req, res, next) {
    productService.updateProduct(req.params.id, req.body)
        .then(() => res.json({ message: 'Product Updated' }))
        .catch(next);
}

function deleteProduct(req, res, next) {
    productService.deleteProduct(req.params.id)
        .then(() => res.json({ message: 'Product Deleted' }))
        .catch(next);
}

// schema functions

function createProductSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().integer().min(0).required(),
        image: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateProductSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        price: Joi.number().min(0).empty(''),
        quantity: Joi.number().integer().min(0).empty(''),
        image: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}
