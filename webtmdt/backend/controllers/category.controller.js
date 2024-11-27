
const Category=require('../models/category.model');    

const getCategories= async (req, res) => {

    try{
        const categories= await Category.find({})
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const createCategory= async (req, res) => {

    try{
        const categories= await Category.create(req.body)
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateCategory= async (req, res) => {

    try{
        const {id} = req.params;
        console.log(id)
        const categories= await Category.findByIdAndUpdate(id,req.body);
        if(!categories){
            return res.status(404).json({message:"Category not found"});
        }
        const updateCategory= await Category.findById(id)
        res.status(200).json(updateCategory)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const deleteCategory= async (req, res) => {

    try{
        const {id} = req.params;
        const categories= await Category.findByIdAndDelete(id);
        if(!categories){
            return res.status(404).json({message:"Category not found"});
        }
        res.status(200).json({message:"Category deleted successful"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getCategories,createCategory,deleteCategory,updateCategory
}