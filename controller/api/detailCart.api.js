
const DetailCart = require('../../model/detailCart.model');

const getDetailCart= async (req, res) => {

    try{
        const detail= await DetailCart.find({})
        res.status(200).json(detail)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports ={
    getDetailCart
}