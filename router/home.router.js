const express = require('express');

const router = express.Router();
const userController = require('../controller/user/userController');
const homeController = require('../controller/user/homeController');

const cartController = require('../controller/user/cartController');
const orderController = require('../controller/user/orderController');

// Định nghĩa các route
router.get('/login', userController.signIn);
router.get('/myaccount', userController.myAccount);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/',homeController.index);
router.get('/checkout',orderController.index);
router.post('/checkout',orderController.create);
router.get('/cart',cartController.index); 
router.post('/cart',cartController.create); 
router.get('/product-detail/:id',homeController.productDetail);
module.exports=router