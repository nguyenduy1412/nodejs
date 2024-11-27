var Order = require('../../model/order.model.js');

const orderController = {
    index: async (req, res) => {
        try {
            const order = await Order.find().populate('addressShip')
            res.render('admin/order/index', { order });
            console.log('o đờ',order)
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving order");
        }
    },
    
}
module.exports = orderController;