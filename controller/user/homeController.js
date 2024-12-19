
const Banner=require('../../model/banner.model');
const Cart = require('../../model/cart.model');
const Category=require('../../model/category.model');
const DetailCart = require('../../model/detailCart.model');
const DetailOrder = require('../../model/detailOrder.model');
const Product=require('../../model/product.model');
const Review = require('../../model/review.model');
const homController= {

    index: async (req,res)=>{
        console.log("làn 1")
        let cart=null;
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
            
            if(cart){
               
                const details = await DetailCart.find({ cart:cart.id }).populate('product'); // Lấy tất cả detailCart theo cartId
                const totalQuantity = details.reduce((sum, detail) => sum + detail.quantity, 0);
                let sum=0;
                details.forEach(item => {
                    sum+=item.product.priceSale * item.quantity;
                });
                
                cart=await Cart.findByIdAndUpdate(cart.id,{
                    total:totalQuantity,
                    price:sum
                })
            }
            
        }
        
    
    // Tính tổng số lượng
        
        const listBanners = await Banner.find({}).sort({ position: 1 });
        const listCategories = await Category.find({status:true})
        const listProductNew = await Product.find({})
        .sort({ dateAdded: -1 }) // Sắp xếp giảm dần theo dateAdded
        .limit(12); 
        const listTrend=await Product.find({}).limit(3);
        const listSale = await Product.find({ sale: { $gt: 0 } }).limit(6);
        
       
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
            cart,
            listTrend
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
            let listReview= await Review.find({product: product.id})
            res.render("user/bookDetail", { product,user ,cart,listReview});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    categoryProduct: async (req, res)=>{
        let cart=null;
        const user=req.user
        const page = 1;  // Trang hiện tại
        const limit = 12; // Số lượng bản ghi mỗi trang
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        const id = req.params.id;
        try {
            const skip = (page - 1) * limit;

    // Truy vấn MongoDB với phân trang
            const listProduct = await Product.find({
                category: id
            })
            .skip(skip)  // Bỏ qua số bản ghi theo trang
            .limit(limit);

            let listCategory=await Category.find({
                status: true
            })
           
            res.render("user/findBook", { listProduct,user ,cart,listCategory});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    listProduct: async (req, res)=>{
        
        let currentPage = req.body.currentPage || 1;
        let categoryId=req.body.categoryId|| 1
        let limit = req.body.limit|| 12
        console.log("Limit currentPage categoryId",limit,currentPage,categoryId)
        let cart=null;
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        try {
            const skip = (currentPage  - 1) * limit;

    // Truy vấn MongoDB với phân trang
            let listProduct,totalProducts;
            if(categoryId==1)
            {
                listProduct = await Product.find({
                    status:true
                })
                .skip(skip)  // Bỏ qua số bản ghi theo trang
                .limit(limit);
                totalProducts = await Product.countDocuments({})
                console.log("Lo",totalProducts);
            }
            else{
                listProduct = await Product.find({
                    status:true,
                    category:categoryId
                })
                .skip(skip)  // Bỏ qua số bản ghi theo trang
                .limit(limit);
                totalProducts = await Product.countDocuments({
                    category: categoryId
                })
                
            }
            
            
            const totalPages = Math.ceil(totalProducts / limit); 
            let listCategory=await Category.find({
                status: true
            })
            let page={
                totalPages:totalPages,
                currentPage :currentPage ,
                limit :limit,
                categoryId:categoryId
            }
          
            res.render("user/findBook", { listProduct,user ,cart,listCategory,page});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }


}

module.exports = homController;