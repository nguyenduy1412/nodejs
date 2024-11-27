const express =require('express');
const router=express.Router();

const {getOrder,updateOrder} = require('../../controller/api/order.api');


router.patch('/:id',updateOrder);

router.get('/',getOrder);


module.exports = router;