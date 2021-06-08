const express = require('express');
const productRouter = express.Router();
const productRepository = require('../repository/productRepository');

// Get all products
productRouter.get('', (req, res, next)=>{
    return productRepository.getAllProducts().then(productData =>{
        res.json(productData.rows);
    }).catch( err => next(err));
});

// Create new product
productRouter.post('', (req, res, next)=>{
    let reqBody = req.body;
    return productRepository.createProduct(reqBody).then(productData =>{
        res.json(productData.rows);
    }).catch( err=> next(err));
});

// Get product by Id
productRouter.get('/:productId', (req, res, next)=>{
    let productId = req.params.productId;
    return productRepository.getProductById(productId).then(productData =>{
        res.json(productData.rows);
    }).catch(err => next(err));
});

// Update product by Id
productRouter.put('/:productId', (req, res, next)=>{
    let productId = req.params.productId;
    let reqBody = req.body;
    return productRepository.updateProductById(productId, reqBody).then(productData =>{
        res.json({'msg': 'Product updated!'});
    }).catch(err => next(err));
});

// Delete product by Id
productRouter.delete('/:productId', (req, res, next)=>{
    let productId= req.params.productId;
    return productRepository.deleteProductById(productId).then(productData =>{
        let msg = productData.rowCount ===0 ? `Product does not exists!` : `Deleted successfully!`;
        res.json({ 'msg': msg });
    }).catch(err => next(err));
});

module.exports = productRouter;