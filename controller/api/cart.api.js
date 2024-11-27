const Cart=require('../../model/cart.model');    

const getCart= async (req, res) => {

    try{
        const cart= await Cart.find({})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const createCart= async (req, res) => {
    console.log(req.body);
    try{
        const cart= await Cart.create(req.body)
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getCart,createCart
}