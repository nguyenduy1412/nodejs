const Order=require('../../model/order.model');

const getOrder= async (req, res) => {

    try{
        const order= await Order.find({})
        res.status(200).json(order)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const updateOrder= async (req, res) => {
    console.log(req.body);
    try{
        const order= await Order.findByIdAndUpdate(req.params.id,{status: req.body.status})
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
        }
        res.status(200).json(order)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getOrder,updateOrder
}