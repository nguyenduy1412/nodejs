const express =require('express');
const router=express.Router();
const User = require('../../model/users.model');
const {getUser,register,deleteUser,login} = require('../../controller/api/login.api');
const auth = require('../../middleware/auth');



router.get('/',getUser);
router.post('/',register);
router.delete('/:id',deleteUser);
router.post('/login',login);


module.exports = router;