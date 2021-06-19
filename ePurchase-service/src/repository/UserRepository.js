const dbPool = require('../utilities/getDbPool');

const userRepository ={};

// Create new user
userRepository.createUser = (reqBody)=>{
    let queryText = `INSERT INTO Users(email, user_details, user_cart, user_creds) 
    VALUES( $1, $2, $3, $4) RETURNING user_id`;
    let queryValue = [reqBody.email, JSON.stringify(reqBody.userDetails), JSON.stringify(reqBody.userCart), JSON.stringify(reqBody.userCreds) ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get All users
userRepository.getAllUsers = ()=>{
    try{
        let query = `SELECT user_id, email, user_details, user_cart FROM Users`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get user by Id
userRepository.getUserById = (userId)=>{
    let queryText = `SELECT user_id, email, user_details, user_cart FROM Users WHERE user_id = $1`;
    let queryValue = [ userId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Update user by Id
userRepository.updateUserById = (userId, reqBody)=>{
    let queryDetails = generateUpdateQuery(userId, reqBody);
    try{
        return dbPool.query(queryDetails[0], queryDetails[1]);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Delete user by Id
userRepository.deleteUserById = (userId)=>{
    let queryText = `DELETE FROM Users WHERE user_id = $1`;
    let queryValue = [ userId ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

userRepository.addItemsToCart = (userId, reqBody) =>{
    let queryText=`UPDATE users SET user_cart=$1 WHERE user_id=$2 RETURNING user_cart`;
    let queryValue =[ JSON.stringify(reqBody) , userId];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

function generateUpdateQuery(userId, reqBody) {
    let queryText=`UPDATE users SET`;
    let queryValue = [];
    let index =1;
    for( var key in reqBody){
        queryText += (index !==1 ) ? ',': '';
        queryText += ` ${key} =$${index}`;
        queryValue.push(typeof reqBody[key]=='object' ? JSON.stringify(reqBody[key]) : reqBody[key]);
        index++;
    }
    queryText += ` WHERE user_id=$${index}`;
    queryValue.push(userId);
    return [ queryText, queryValue];
}

module.exports = userRepository;