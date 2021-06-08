const dbPool = require('../utilities/getDbPool');

const productRepository ={};

// Create new product
productRepository.createProduct = (reqBody)=>{
    let queryText = `INSERT INTO Products(product_details, seller_details) 
    VALUES( $1, $2 ) RETURNING product_id`;
    let queryValue = [ JSON.stringify(reqBody.productDetails), JSON.stringify(reqBody.sellerDetails) ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get All products
productRepository.getAllProducts = ()=>{
    try{
        let query = `SELECT * FROM Products`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get product by Id
productRepository.getProductById = (productId)=>{
    let queryText = `SELECT * FROM Products WHERE product_id = $1`;
    let queryValue = [ productId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Update product by Id
productRepository.updateProductById = (productId, reqBody)=>{
    let queryDetails = generateUpdateQuery(productId, reqBody);
    try{
        return dbPool.query(queryDetails[0], queryDetails[1]);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Delete product by Id
productRepository.deleteProductById = (productId)=>{
    let queryText = `DELETE FROM Products WHERE product_id = $1`;
    let queryValue = [ productId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

function generateUpdateQuery(productId, reqBody) {
    let queryText=`UPDATE Products SET`;
    let queryValue = [];
    let index =1;
    for( var key in reqBody){
        queryText += (index !==1 ) ? ',': '';
        queryText += ` ${key} =$${index}`;
        queryValue.push(typeof reqBody[key]=='object' ? JSON.stringify(reqBody[key]) : reqBody[key]);
        index++;
    }
    queryText += ` WHERE product_id=$${index}`;
    queryValue.push(productId);
    return [ queryText, queryValue];
}

module.exports = productRepository;