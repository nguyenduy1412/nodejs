
const Cart = require('../../model/cart.model');
const DetailCart = require('../../model/detailCart.model');

const getDetailCart= async (req, res) => {

    try{
        const detail= await DetailCart.find({})
        res.status(200).json(detail)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const addDetailCart=async (req, res) => {
  
    try{
        let cart = await Cart.findOne({ user: req.body.userId })
            console.log("cart lèng", cart)
            console.log("product",req.body.productId)
            // nếu không có cart thì tạo mới
            console.log("id", req.body.userId)
            if (!cart) {
                cart = await Cart.create({
                    user: req.body.userId,
                    price: 0
                });
                console.log("Có thêm cart không", cart);
            }
            const checkDetail=await DetailCart.findOne({ cart: cart.id, product: req.body.productId})
            let detail;
            if(!checkDetail){
                 detail = await DetailCart.create({
                    quantity: 1,
                    product: req.body.productId,
                    cart: cart.id
                })
            }
           

            else{
                let quantityNew=checkDetail.quantity + 1
                 detail=await DetailCart.findByIdAndUpdate(checkDetail.id, {quantity:quantityNew})
            }
            let listDetail=await DetailCart.find({cart: cart.id}).populate('product'); 
            let sum=0;
            listDetail.forEach(item => {
                sum+=item.product.priceSale * item.quantity;
            })
            cart =await Cart.findByIdAndUpdate(cart.id,{
                total: Number(cart.total) +1,
                price:sum
            })
            console.log("Cart lè:",cart)
        res.status(200).json(detail)
       
    }catch(err){
        console.log("Lõi àd"+err.message)
        res.status(500).json({message: err.message});
    }
}
const deleteDetailCart= async (req, res) => {

    try{
        console.log("Vào không")
        console.log("1")
        const {id} = req.params;
        console.log("id",id)
        let detailCart=await DetailCart.findById(id).populate('product')
        console.log("2")
        let cart=await Cart.findById(detailCart.cart);
        console.log("3")
        cart =await Cart.findByIdAndUpdate(cart.id,{
            total: Number(cart.total) -detailCart.quantity,
            price: Number(cart.price) - detailCart.quantity * detailCart.product.priceSale
        })
        console.log("4")
        const detail= await DetailCart.findByIdAndDelete(id);
        console.log("5")
        if(!detail){
            return res.status(404).json({message:"detail not found"});
        }
        res.status(200).json({message:"detail deleted successful"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const updateQuantityCart= async (req, res) => {

    try{
        console.log("Vào không")
        console.log("1")
        const {id} = req.params;
        console.log("id",id)
        let detailCart=await DetailCart.findById(id).populate('product')
        
        detailCart =await DetailCart.findByIdAndUpdate(id,{
            quantity: Number(req.body.quantity)
        })
        let cart=await Cart.findById(detailCart.cart);
        
        let listDetail=await DetailCart.find({cart: cart.id}).populate('product'); 
            let sum=0;
            let total=0
            listDetail.forEach(item => {
                sum+=item.product.priceSale * item.quantity;
                total+=item.quantity
            })
        console.log("3")
       
      
        cart =await Cart.findByIdAndUpdate(cart.id,{
            total: total,
            price: sum
        })
        console.log("4")
        
        
        res.status(200).json({message:"detail update successful"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getDetailCart,addDetailCart,deleteDetailCart,updateQuantityCart
}