const express =require('express');
const router=express.Router();
const Category = require('../models/category.model');
const {getCategories,createCategory,updateCategory,deleteCategory} = require('../controllers/category.controller.js');


router.get('/',getCategories);
router.post('/',createCategory);
router.put('/:id',updateCategory);
router.delete('/:id',deleteCategory);


module.exports = router;