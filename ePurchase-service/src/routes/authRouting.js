const express = require('express');
const authRouter = express.Router();
const authRepository = require('../repository/authRepository');
const jwt = require('jsonwebtoken');

// Login
authRouter.post('/login', (req, res, next)=>{
    let reqBody = req.body;
    return authRepository.logIn(reqBody).then(userItem =>{
        if(userItem.rows.length !==0){
            const user ={
                email: reqBody.email,
                password: reqBody.password
            }
            jwt.sign({user}, 'secretkey' , (err, token)=> {
                let data = {
                    token: token,
                    userData: userItem.rows[0]
                }
                res.json(data);
            });
        } else{
            res.status(403).send({ msg: 'Invalid Login Credentials!!'});
        }
    }).catch( err=> {
        res.status(400).send({ msg: err.message});
        next(err);
    });
});

module.exports = authRouter;