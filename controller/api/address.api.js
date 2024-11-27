const Address=require('../../model/address.model');

const getAddress= async (req, res) => {

    try{
        const address= await Address.find({})
        res.status(200).json(address)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports ={
    getAddress
}