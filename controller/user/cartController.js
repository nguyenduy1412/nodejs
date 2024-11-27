
const Banner = require('../../model/banner.model')
const Category = require('../../model/category.model')
const DetailCart = require('../../model/detailCart.model')
const Product = require('../../model/product.model')
const Cart = require('../../model/cart.model')

const cartController = {

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

            res.render('user/cart', {
                detailCarts,
                cart,
                user
            })
        } catch (error) {
            console.error("Lỗi à", error);
        }

    },
    create: async (req, res) => {
        let user = req.user;
        try {
            const { quantity, productId } = req.body;
            
            console.log(quantity, productId)
            if (!user) {
                res.user = null
                return res.status(401).redirect('/login');
            }
            let cart = await Cart.findOne({ user: user.id })
            const checkDetail=await DetailCart.findOne({ cart: cart.id, product: productId})
            if(!checkDetail){
                let detail = await DetailCart.create({
                    quantity: quantity,
                    product: productId,
                    cart: cart.id
                })
            }
            else{
                let quantityNew=checkDetail.quantity + Number(quantity)
                let detail=await DetailCart.findByIdAndUpdate(checkDetail.id, {quantity:quantityNew})
            }
            let totalPrice = 0;
            let total=0
            const listDetail = await DetailCart.find({ cart: cart.id })
            .populate('product');
            listDetail.forEach(detail => {
                totalPrice += Number(detail.quantity) * detail.product.priceSale; // Cộng dồn tổng giá
                total+=Number(detail.quantity) 
            });
            console.log(totalPrice+"Là n    ")
            cart= await Cart.findByIdAndUpdate(cart.id,{ price: totalPrice,total:total})
            console.log("Có lỗi không")
            res.redirect('/cart');
        } catch (error) {
            console.error("Lỗi r", error);
        }
    }



}

module.exports = cartController;