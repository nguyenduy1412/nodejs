
const Banner=require('../../model/banner.model');
const Cart = require('../../model/cart.model');
const Category=require('../../model/category.model');
const DetailOrder = require('../../model/detailOrder.model');
const Product=require('../../model/product.model')
const homController= {

    index: async (req,res)=>{
        let cart=null;
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        
        const listBanners = await Banner.find({}).sort({ position: 1 });
        const listCategories = await Category.find({status:true})
        const listProductNew = await Product.find({})
        .sort({ dateAdded: -1 }) // Sắp xếp giảm dần theo dateAdded
        .limit(12); 
        const listSale = await Product.find({ sale: { $gt: 0 } }).limit(6);
        
        console.log("iu sơ",user);
        const groupProducts = (list, groupSize) => {
            const groups = [];
            for (let i = 0; i < list.length; i += groupSize) {
                groups.push(list.slice(i, i + groupSize));
            }
            return groups;
        };
        
        // Tách list sản phẩm thành các nhóm có 2 phần tử
        const listNew = groupProducts(listProductNew, 2);
       
        res.render('user/index',{
            listBanners,
            listCategories,
            listNew,
            listSale,
            user,
            cart
        })
    },
    productDetail: async (req,res)=>{
        let cart=null;
        
       
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        const id = req.params.id;
        try {
            const product = await Product.findById(id)
            .populate('category')  // Tự động điền thông tin danh mục
            .populate('brand');    // Tự động điền thông tin thương hiệu
            if(!product){
                res.status(500).json({ message: err.message });
            }
            res.render("user/bookDetail", { product,user ,cart});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
        

    }


}

module.exports = homController;