const dbPool = require('../utilities/getDbPool');

const userCredRepository ={};

// Create new user
userCredRepository.createUserCred = (reqBody, userId)=>{
    try{
        let query = `INSERT INTO UserCreds(userid, usermail, userpass) 
        VALUES('${userId}','${reqBody.email}', '${reqBody.password}') RETURNING credId`;
        return dbPool.query(query);
    }
    catch(e){
        let err = new Error(e);
        response.status(400).send({ message: err.message});
    }
}

module.exports = userCredRepository;