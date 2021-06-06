const dbPool = require('../utilities/getDbPool');

const userRepository ={};

// Create new user
userRepository.createUser = (reqBody)=>{
    let queryText = `INSERT INTO Users(firstName, lastName, email ,dob, phone, cartDetails, address) 
    VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING userid`;
    let queryValue = [reqBody.firstName, reqBody.lastName, reqBody.email, reqBody.dob, reqBody.phone, JSON.stringify(reqBody.cartDetails), reqBody.address ];
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
        let query = `SELECT * FROM Users`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

// Get user by Id
userRepository.getUserById = (userId)=>{
    let queryText = `SELECT * FROM Users WHERE userid = $1`;
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
    let queryText = `DELETE FROM Users WHERE userid = $1`;
    let queryValue = [ userId ];
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
    queryText += ` WHERE userid=$${index}`;
    queryValue.push(userId);
    return [ queryText, queryValue];
}

module.exports = userRepository;