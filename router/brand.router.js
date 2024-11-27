const express = require('express');

module.exports = (upload) => {
    const route = express.Router();
    const brandController = require('../controller/admin/brandController');

    // Định nghĩa các route
    route.get('/', brandController.index);
    route.get('/add', brandController.add);
    
    // Sử dụng `upload.single('image')` cho route xử lý POST
    route.post('/add', upload.single('img'),brandController.create );

    route.get('/edit/:id', brandController.edit);
    route.post('/update', upload.single('img'),brandController.update );
    route.get('/delete/:id', brandController.delete);
    return route;
};