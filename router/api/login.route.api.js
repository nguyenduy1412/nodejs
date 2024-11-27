const express =require('express');
const router=express.Router();
const User = require('../../model/users.model');
const {login} = require('../../controller/api/login.api');
const auth = require('../../middleware/auth');


router.post('/login',login);


module.exports = router;