
const Banner = require('../../model/banner.model')
const Category = require('../../model/category.model')
const DetailCart = require('../../model/detailCart.model')
const Product = require('../../model/product.model')
const Cart = require('../../model/cart.model')
const Address = require('../../model/address.model')
const MethodPay = require('../../model/methodPay.model')
const Order = require('../../model/order.model')
const DetailOrder = require('../../model/detailOrder.model')
const DiscountCode = require('../../model/discountCode')
const Review = require('../../model/review.model')

const orderController = {

    index: async (req, res) => {

        let user = req.user;

        try {

            if (!user) {
                res.user = null
                return res.status(401).redirect('/login');
            }
            let cart = await Cart.findOne({ user: user.id }).populate('user');

            // nếu không có cart thì tạo mới
            console.log("id", user.id)
            if (!cart) {
                cart = await Cart.create({
                    user: user.id,
                    price: 0
                });

            }
            const detailCarts = await DetailCart.find({ cart: cart.id })
                .populate('cart') // Tham chiếu chi tiết thông tin cart
                .populate('product'); // Tham chiếu chi tiết thông tin product
            const address = await Address.findOne({ user: user.id });

            const method = await MethodPay.find({});
            const discountCodes = await DiscountCode.find({

            })

            res.render('user/checkout', {
                detailCarts,
                cart,
                user,
                address,
                method,
                discountCodes
            })
        } catch (error) {
            console.error("Lỗi à", error);
        }

    },
    create: async (req, res) => {
        let user = req.user;
        let discountCode = req.body.discount_code ? req.body.discount_code.trim() : null;
        console.log("yiu sơ", user)
        console.log("total", req.body.sumMoney)
        console.log("discountCode ", discountCode)

        try {

            if (!user) {
                res.user = null
                return res.status(401).redirect('/login');
            }
            const { name, addressShip, phone, payId, note } = req.body
            console.log("Requejt body" + name + addressShip + phone + payId + note)
            let address = await Address.findOne({ user: user.id });
            console.log("Address" + address)
            if (!address) {

                address = await Address.create({
                    name: name,
                    addressShip: addressShip,
                    phone: phone,
                    user: user.id
                })
            } else {
                console.log("Alo không")
                address = await Address.findByIdAndUpdate(address.id, {
                    name: name,
                    addressShip: addressShip,
                    phone: phone,
                    user: user.id
                })
            }
            console.log("HUs")
            let cart = await Cart.findOne({ user: user.id }).populate('user');
            console.log("Cart" + cart);
            const detailCarts = await DetailCart.find({ cart: cart.id }).populate('product');
            console.log("HUss")
            const order = await Order.create({
                sumMoney: req.body.sumMoney,
                status: 0,
                user: user.id,
                note: note,
                pay: payId,
                addressShip: address.id,
                discountCode: discountCode
            })
            if (discountCode == null) {
                console.log("discont1 = null " + discountCode);
            }
            else {


                let disCode = await DiscountCode.findOne({
                    nameCode: discountCode
                })

                disCode = await DiscountCode.findByIdAndUpdate(disCode.id, {
                    quantity: disCode.quantity - 1
                })
            }
            console.log("order", order);
            for (const item of detailCarts) {
                // thêm tất cả item từ cart vào order
                let detail = await DetailOrder.create({
                    quantity: item.quantity,
                    price: item.product.priceSale,
                    order: order.id,
                    product: item.product
                });
                // xóa tất cả sản phẩm ra khỏi giỏ hàng
                let deleteDetail = await DetailCart.findByIdAndDelete(item.id)
                // xóa thông tin từ giỏ hàng
                let cartUpdate = await Cart.findByIdAndUpdate(cart.id, {
                    total: 0,
                    price: 0
                })
            }


            res.redirect('/');
        } catch (error) {
            console.error("Lỗi rồi hu hu", error);
        }
    },
    detailOrder: async (req, res) => {
        const id = req.params.id;
        let order = await Order.findById(id)
        console.log("order", order.discountCode);
        let priceDiscount=0;
        if(order.discountCode!=null){
            let discountCode = await DiscountCode.findOne({ nameCode: order.discountCode })
            let priceDiscount = discountCode.money
            console.log("priceDiscount" + priceDiscount);
        }
        
        const user = req.user
        let cart = await Cart.findOne({ user: user.id }).populate('user');

        let detailOrders = await DetailOrder.find({
            order: id
        }).populate('product')
        let sum=0;
        detailOrders.forEach(item => {
            sum+=item.quantity * item.price
        })
        console.log("sum" + sum)
        res.render('user/orderDetail', {
            detailOrders,
            order, cart, user, priceDiscount,sum
        })
    },
    addRating: async (req, res) => {
        const id = req.params.id;
        let orderDetail = await DetailOrder.findById(id).populate('product');

        const user = req.user
        let cart = await Cart.findOne({ user: user.id }).populate('user');
        res.render('user/rating',{
            user, cart,orderDetail
        })
    },
    rating: async(req,res)=>{
        const {star,productId,comment,userId,orderDetailId}=req.body;
        let img = req.file ? req.file.filename : req.body.img;
        let rating =await Review.create({
            product: productId,
            user: userId,
            detailOrder: orderDetailId,
            star:star,
            img:img,
            comment:comment
        })
        let orderDetail=await DetailOrder.findByIdAndUpdate(orderDetailId,{
            statusReview:true
        })
        res.redirect('/myaccount')
    }
}

module.exports = orderController;