
const Banner = require('../../model/banner.model')
const Category = require('../../model/category.model')
const DetailCart = require('../../model/detailCart.model')
const Product = require('../../model/product.model')
const Cart = require('../../model/cart.model')
const Address = require('../../model/address.model')
const MethodPay = require('../../model/methodPay.model')
const Order = require('../../model/order.model')
const DetailOrder = require('../../model/detailOrder.model')

const orderController = {

    index: async (req, res) => {

        let user = req.user;
        console.log("yiu sơ", user)
        try {

            if (!user) {
                res.user = null
                return res.status(401).redirect('/login');
            }
            let cart = await Cart.findOne({ user: user.id }).populate('user');
            console.log("cart lèng", cart)
            // nếu không có cart thì tạo mới
            console.log("id", user.id)
            if (!cart) {
                cart = await Cart.create({
                    user: user.id,
                    price: 0
                });
                console.log("Có thêm cart không", cart);
            }
            const detailCarts = await DetailCart.find({ cart: cart.id })
                .populate('cart') // Tham chiếu chi tiết thông tin cart
                .populate('product'); // Tham chiếu chi tiết thông tin product
            const address= await Address.findOne({ user: user.id });
            console.log("Address",address) 
            const method=await MethodPay.find({  });
            res.render('user/checkout', {
                detailCarts,
                cart,
                user,
                address,
                method
            })
        } catch (error) {
            console.error("Lỗi à", error);
        }

    },
    create: async (req, res) => {
        let user = req.user;
        console.log("yiu sơ", user)
        try {

            if (!user) {
                res.user = null
                return res.status(401).redirect('/login');
            }
            const {name,addressShip,phone,payId,note} = req.body
            console.log("Requejt body"+name+addressShip+phone+payId+note)
            let address= await Address.findOne({ user: user.id });
            console.log("Address"+address)
            if(!address){
                console.log("Alo nào")
                address=await Address.create({
                    name:name,
                    addressShip:addressShip,
                    phone: phone,
                    user:user.id
                })
            }else{
                console.log("Alo không")
                address=await Address.findByIdAndUpdate(address.id,{
                    name:name,
                    addressShip:addressShip,
                    phone: phone,
                    user:user.id
                })
            }
            console.log("HUs")
            let cart = await Cart.findOne({ user: user.id }).populate('user');
            console.log("Cart"+cart);
            const detailCarts = await DetailCart.find({ cart: cart.id })
            console.log("HUss")
            const order=await Order.create({
                sumMoney:cart.price,
                status: 0,
                user:user.id,
                note:note,
                pay:payId,
                addressShip:address.id
            })
            console.log("order",order);
            for (const item of detailCarts) {
                // thêm tất cả item từ cart vào order
                let detail = await DetailOrder.create({
                    quantity:item.quantity,
                    price:item.product.priceSale,
                    order:order.id,
                    product:item.product
                });
                // xóa tất cả sản phẩm ra khỏi giỏ hàng
                let deleteDetail=await DetailCart.findByIdAndDelete(item.id)
                // xóa thông tin từ giỏ hàng
                let cartUpdate=await Cart.findByIdAndUpdate(cart.id,{
                    total:0,
                    price:0
                })
            }
            
            
            res.redirect('/');
        } catch (error) {
            console.error("Lỗi rồi hu hu", error);
        }
    }
}

module.exports = orderController;