const express =require('express');
const router=express.Router();

const {getCart,createCart} = require('../../controller/api/cart.api');


router.get('/',getCart);
router.post('/',createCart);



module.exports = router;