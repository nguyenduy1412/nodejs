const express =require('express');
const router=express.Router();

const {getDetailCart,addDetailCart,deleteDetailCart} = require('../../controller/api/detailCart.api');


router.get('/',getDetailCart);
router.post('/',addDetailCart);
router.delete('/:id',deleteDetailCart);


module.exports = router;