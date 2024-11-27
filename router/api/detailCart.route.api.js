const express =require('express');
const router=express.Router();

const {getDetailCart} = require('../../controller/api/detailCart.api');


router.get('/',getDetailCart);




module.exports = router;