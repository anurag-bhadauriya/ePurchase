const dbPool = require('../utilities/getDbPool');

const transactionRepository ={};

// Create new Transaction
transactionRepository.createTransaction = (reqBody)=>{
    let queryText = `INSERT INTO Transactions(order_id) 
    VALUES( $1 ) RETURNING transaction_id`;
    let queryValue = [ reqBody.orderId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get All transactions
transactionRepository.getAllTransactions = ()=>{
    try{
        let query = `SELECT * FROM Transactions`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get transactions by Id
transactionRepository.getTransactionById = (transactionId)=>{
    let queryText = `SELECT * FROM Transactions WHERE transaction_id = $1`;
    let queryValue = [ transactionId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Delete transaction by Id
transactionRepository.deleteTransactionById = (transactionId)=>{
    let queryText = `DELETE FROM Transactions WHERE transaction_id = $1`;
    let queryValue = [ transactionId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

module.exports = transactionRepository;