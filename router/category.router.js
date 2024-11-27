const express = require('express');

module.exports = (upload) => {
    const route = express.Router();
    const categoryController = require('../controller/admin/categoryController');

    // Định nghĩa các route
    route.get('/', categoryController.index);
    route.get('/add', categoryController.add);
    
    // Sử dụng `upload.single('image')` cho route xử lý POST
    route.post('/add', upload.single('img'),categoryController.create );

    route.get('/edit/:id', categoryController.edit);
    route.post('/update', upload.single('img'),categoryController.update );
    route.get('/delete/:id', categoryController.delete);
    return route;
};