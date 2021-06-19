const express = require('express');
const userRouter = express.Router();
// const userCredRepository = require('../repository/UserCredRepository');
const userRepository = require('../repository/userRepository');

// Get all users
userRouter.get('', (req, res, next)=>{
    return userRepository.getAllUsers().then(userData =>{
        res.json(userData.rows);
    }).catch( err => next(err));
});

// Create new user
userRouter.post('', (req, res, next)=>{
    let reqBody = req.body;
    return userRepository.createUser(reqBody).then(userData =>{
        res.json(userData.rows);
    }).catch( err=> next(err));
});

// Get user by Id
userRouter.get('/:userId', (req, res, next)=>{
    let userId = req.params.userId;
    return userRepository.getUserById(userId).then(userData =>{
        res.json(userData.rows);
    }).catch(err => next(err));
});

// Update user by Id
userRouter.put('/:userId', (req, res, next)=>{
    let userId = req.params.userId;
    let reqBody = req.body;
    return userRepository.updateUserById(userId, reqBody).then(userData =>{
        res.json({'msg': 'User updated!'});
    }).catch(err => next(err));
});

// Delete user by Id
userRouter.delete('/:userId', (req, res, next)=>{
    let userId = req.params.userId;
    return userRepository.deleteUserById(userId).then(userData =>{
        res.json({ 'msg': `Deleted successfully!`});
    }).catch(err => next(err));
});

// Add item to cart for particular user
userRouter.post('/:userId/addtocart', (req, res, next)=>{
    let reqBody = req.body;
    let userId = req.params.userId;
    return userRepository.addItemsToCart(userId, reqBody).then(userData =>{
        if (userData.rowCount !==0 ){
            res.json(userData.rows);
        } else{
            res.status(400).send({ msg: 'Cart Update failed !'});
        }
    }).catch( err=> next(err));
});

module.exports = userRouter;