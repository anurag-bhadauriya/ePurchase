const dbPool = require('../utilities/getDbPool');

const orderRepository ={};

// Create new orders
orderRepository.createOrder = (reqBody)=>{
    let queryText = `INSERT INTO Orders(order_details, product_details) 
    VALUES( $1, $2 ) RETURNING order_id`;
    let queryValue = [ JSON.stringify(reqBody.orderDetails), JSON.stringify(reqBody.productDetails) ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get All orders
orderRepository.getAllOrders = ()=>{
    try{
        let query = `SELECT * FROM Orders`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get order by Id
orderRepository.getOrderById = (orderId)=>{
    let queryText = `SELECT * FROM Orders WHERE order_id = $1`;
    let queryValue = [ orderId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Update order by Id
orderRepository.updateOrderById = (orderId, reqBody)=>{
    let queryDetails = generateUpdateQuery(orderId, reqBody);
    try{
        return dbPool.query(queryDetails[0], queryDetails[1]);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Delete order by Id
orderRepository.deleteOrderById = (orderId)=>{
    let queryText = `DELETE FROM Orders WHERE order_id = $1`;
    let queryValue = [ orderId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

function generateUpdateQuery(orderId, reqBody) {
    let queryText=`UPDATE Orders SET`;
    let queryValue = [];
    let index =1;
    for( var key in reqBody){
        queryText += (index !==1 ) ? ',': '';
        queryText += ` ${key} =$${index}`;
        queryValue.push(typeof reqBody[key]=='object' ? JSON.stringify(reqBody[key]) : reqBody[key]);
        index++;
    }
    queryText += ` WHERE order_id=$${index}`;
    queryValue.push(orderId);
    return [ queryText, queryValue];
}

module.exports = orderRepository;