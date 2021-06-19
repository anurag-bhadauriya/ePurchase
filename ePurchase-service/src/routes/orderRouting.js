const express = require('express');
const orderRouter = express.Router();
const orderRepository = require('../repository/orderRepository');

// Get all orders
orderRouter.get('', (req, res, next)=>{
    return orderRepository.getAllOrders().then(orderData =>{
        res.json(orderData.rows);
    }).catch( err => next(err));
});

// Create new order
orderRouter.post('', (req, res, next)=>{
    let reqBody = req.body;
    return orderRepository.createOrder(reqBody).then(orderData =>{
        res.json(orderData.rows);
    }).catch( err=> next(err));
});

// Get order by Id
orderRouter.get('/:orderId', (req, res, next)=>{
    let orderId = req.params.orderId;
    return orderRepository.getOrderById(orderId).then(orderData =>{
        res.json(orderData.rows);
    }).catch(err => next(err));
});

// Update order by Id
orderRouter.put('/:orderId', (req, res, next)=>{
    let orderId = req.params.orderId;
    let reqBody = req.body;
    return orderRepository.updateOrderById(orderId, reqBody).then(orderData =>{
        res.json({'msg': 'Order updated!'});
    }).catch(err => next(err));
});

// Delete order by Id
orderRouter.delete('/:orderId', (req, res, next)=>{
    let orderId= req.params.orderId;
    return orderRepository.deleteOrderById(orderId).then(orderData =>{
        res.json({ 'msg': `Deleted successfully!`});
    }).catch(err => next(err));
});

module.exports = orderRouter;