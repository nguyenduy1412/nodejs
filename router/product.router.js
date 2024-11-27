const express = require('express');

module.exports = (upload) => {
    const route = express.Router();
    const productController = require('../controller/admin/productController');

    // Định nghĩa các route
    route.get('/', productController.index);
    route.get('/add', productController.add);
    
    // Sử dụng `upload.single('image')` cho route xử lý POST
    route.post('/add', upload.single('img'),productController.create );

    route.get('/edit/:id', productController.edit);
    route.post('/update', upload.single('img'),productController.update );
    route.get('/delete/:id', productController.delete);
    return route;
};