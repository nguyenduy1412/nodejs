const express = require('express');
var router=express.Router();
var discountCodeController=require('../controller/admin/discountCodeController')

// Định nghĩa các route
router.get('/', discountCodeController.index);
router.get('/add', discountCodeController.add);

// Sử dụng `upload.single('image')` cho router xử lý POST
router.post('/add',discountCodeController.create );

router.get('/edit/:id', discountCodeController.edit);
router.post('/update', discountCodeController.update );
router.get('/delete/:id', discountCodeController.delete);

module.exports=router