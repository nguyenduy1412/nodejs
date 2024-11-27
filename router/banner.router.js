const express = require('express');


module.exports = (upload) => {
    const route = express.Router();
    const bannerController = require('../controller/admin/bannerController');

   
    // Định nghĩa các route
    route.get('/', bannerController.index);
    route.get('/add', bannerController.add);
    
    // Sử dụng `upload.single('image')` cho route xử lý POST
    route.post('/add', upload.single('img'),bannerController.create );

    route.get('/edit/:id', bannerController.edit);
    route.post('/update', upload.single('img'),bannerController.update );
    route.get('/delete/:id', bannerController.delete);
    return route;
};