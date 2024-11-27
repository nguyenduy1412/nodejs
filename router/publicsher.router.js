const express = require('express');
var router=express.Router();
var publicsherController=require('../controller/admin/PublicsherController')

// Định nghĩa các route
router.get('/', publicsherController.index);
router.get('/add', publicsherController.add);

// Sử dụng `upload.single('image')` cho router xử lý POST
router.post('/add',publicsherController.create );

router.get('/edit/:id', publicsherController.edit);
router.post('/update', publicsherController.update );
router.get('/delete/:id', publicsherController.delete);

module.exports=router