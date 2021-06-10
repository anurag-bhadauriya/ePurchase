const dbPool = require('../utilities/getDbPool');

const authRepository ={};

// Create new user
authRepository.logIn = (reqBody)=>{
    let queryText = `SELECT user_id, email, user_details, user_cart FROM Users WHERE
    email=$1 AND user_creds ->> 'password'=$2`;
    let queryValue = [ reqBody.email, reqBody.password ];
    try{
        return dbPool.query(queryText, queryValue);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

module.exports = authRepository;