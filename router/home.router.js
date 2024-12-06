const express = require('express');

module.exports = (upload) => {
    const router = express.Router();
    const userController = require('../controller/user/userController');
    const homeController = require('../controller/user/homeController');

    const cartController = require('../controller/user/cartController');
    const orderController = require('../controller/user/orderController');

    // Định nghĩa các route
    router.get('/login', userController.signIn);
    router.get('/register', userController.signUp);
    router.post('/register', userController.register);
    router.get('/myaccount', userController.myAccount);
    router.post('/myaccount',upload.single('fileImage'), userController.update);
    router.post('/login', userController.login);
    router.post('/updatePass', userController.updatePass);
    router.get('/logout', userController.logout);
    router.get('/', homeController.index);
    router.get('/checkout', orderController.index);
    router.post('/checkout', orderController.create);
    router.get('/cart', cartController.index);
    router.post('/cart', cartController.create);
    router.get('/product-detail/:id', homeController.productDetail);
    return router;
};