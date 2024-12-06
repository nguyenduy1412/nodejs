const express =require('express');
const router=express.Router();

const {getDetailCart,addDetailCart,deleteDetailCart,updateQuantityCart} = require('../../controller/api/detailCart.api');


router.get('/',getDetailCart);
router.post('/',addDetailCart);
router.delete('/:id',deleteDetailCart);
router.patch('/:id',updateQuantityCart);


module.exports = router;