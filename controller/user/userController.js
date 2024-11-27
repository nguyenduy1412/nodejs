var User = require('../../model/users.model.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUserService,loginService } = require('../../service/user.service');
const Cart = require('../../model/cart.model.js');
const Order = require('../../model/order.model.js');
const userController = {
    signIn: async (req,res)=>{
        
        let cart=null;
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        res.render('user/login',{error:null,user:user,cart});
    },
    logout: (req,res)=>{
        res.clearCookie('token'); // 'token' là tên cookie bạn lưu trữ JWT token
        req.user = null;
        res.status(200).redirect('/login');
    },
    login: async (req, res) => {
        console.log('Uả----------------')
        let cart=null;
        const user=req.user
        if(user){
            cart = await Cart.findOne({ user: user.id })
        }
        try {
            const {email,password} = req.body
            const result = await loginService(email, password);

            if (result.EC) {
               
                console.log(result.EM); // Log thông báo lỗi
                return res.render('user/login', { error: result.EM }); // Hiển thị thông báo lỗi trên giao diện
            }
            res.cookie('token', result.accessToken, {
                httpOnly: true, // Giúp bảo vệ cookie khỏi bị truy cập từ client-side JS
                
                maxAge: 3600000, // Thời gian sống của cookie (1 giờ)
            });
            const decoded = jwt.verify(result.accessToken, process.env.JWT_SECRET);

        // Lấy thông tin user và vai trò
            const user = await User.findOne({ email: decoded.email });
            // Đăng nhập thành công
            console.log("Đăng nhập thành công:", user);
            res.redirect('/'); // Chuyển hướng về trang chủ
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving user");
        }
    },
    myAccount:async (req, res) => {
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
            let order=await Order.find({ user: user.id })
            res.render('user/myaccount', {
                order,
                cart,
                user
            })
        } catch (error) {
            console.error("Lỗi à", error);
        }
    },
    create: async (req, res) => {
        try {
            // Sử dụng user.create để tạo và lưu danh mục mới vào MongoDB
            const user = await user.create({
                email: req.body.email,
                password: req.body.password, // status có thể là true hoặc false
            
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const user = await user.findById(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.render("admin/user/update", { user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
       
        let img = req.file ? req.file.filename : req.body.img; 
        console.log(req.body)
        console.log(img)
       
        try {
            const user = await user.findByIdAndUpdate(
                req.body.id, 
                {
                    link: req.body.link,
                    status: req.body.status, // status có thể là true hoặc false
                    img: img,   
                    position:req.body.position 
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const user = await user.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = userController;