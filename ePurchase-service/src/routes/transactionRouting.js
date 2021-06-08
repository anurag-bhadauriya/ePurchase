const express = require('express');
const transactionRouter = express.Router();
const transactionRepository = require('../repository/transactionRepository');

// Get all Transactions
transactionRouter.get('', (req, res, next)=>{
    return transactionRepository.getAllTransactions().then(transactionData =>{
        res.json(transactionData.rows);
    }).catch( err => next(err));
});

// Create new Transactions
transactionRouter.post('', (req, res, next)=>{
    let reqBody = req.body;
    return transactionRepository.createTransaction(reqBody).then(transactionData =>{
        res.json(transactionData.rows);
    }).catch( err=> next(err));
});

// Get Transaction by Id
transactionRouter.get('/:transactionId', (req, res, next)=>{
    let transactionId = req.params.transactionId;
    return transactionRepository.getTransactionById(transactionId).then(transactionData =>{
        res.json(transactionData.rows);
    }).catch(err => next(err));
});

// Delete Transaction by Id
transactionRouter.delete('/:transactionId', (req, res, next)=>{
    let transactionId= req.params.transactionId;
    return transactionRepository.deleteTransactionById(transactionId).then(transactionData =>{
        res.json({ 'msg': `Deleted successfully!`});
    }).catch(err => next(err));
});

module.exports = transactionRouter;