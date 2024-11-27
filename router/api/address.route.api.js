const express =require('express');
const router=express.Router();

const {getAddress} = require('../../controller/api/address.api');


router.get('/',getAddress);




module.exports = router;