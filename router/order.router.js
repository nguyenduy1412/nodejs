const express = require('express');
var router=express.Router();
var orderController=require('../controller/admin/orderController')

// Định nghĩa các route
router.get('/', orderController.index);


module.exports=router