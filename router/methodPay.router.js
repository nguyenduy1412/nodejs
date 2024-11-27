const express = require('express');
var router=express.Router();
var methodPayController=require('../controller/admin/methodPayController')

// Định nghĩa các route
router.get('/', methodPayController.index);
router.get('/add', methodPayController.add);

// Sử dụng `upload.single('image')` cho router xử lý POST
router.post('/add',methodPayController.create );

router.get('/edit/:id', methodPayController.edit);
router.post('/update', methodPayController.update );
router.get('/delete/:id', methodPayController.delete);

module.exports=router