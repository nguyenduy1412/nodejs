const express =require('express');
const router=express.Router();
const Role = require('../../model/role.model');
const {getRole,createRole,updateRole,deleteRole} = require('../../controller/api/role.api');


router.get('/',getRole);
router.post('/',createRole);
router.put('/:id',updateRole);
router.delete('/:id',deleteRole);


module.exports = router;