var User = require('../../model/users.model.js');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();
const { createUserService, loginService } = require('../../service/user.service');
const { createUserRoleService } = require('../../service/userRole.service');
const Cart = require('../../model/cart.model.js');
const Order = require('../../model/order.model.js');
const salt=10
const userController = {
    signIn: async (req, res) => {

        let cart = null;
        const user = req.user
        if (user) {
            cart = await Cart.findOne({ user: user.id })
        }
        res.render('user/login', { error: null, user: user, cart });
    },
    logout: (req, res) => {
        res.clearCookie('token'); // 'token' là tên cookie bạn lưu trữ JWT token
        req.user = null;
        res.status(200).redirect('/login');
    },
    login: async (req, res) => {
        console.log('Uả----------------')
        let cart = null;
        const user = req.user
        if (user) {
            cart = await Cart.findOne({ user: user.id })
        }
        try {
            const { email, password } = req.body
            const result = await loginService(email, password);

            if (result.EC) {

                console.log(result.EM); // Log thông báo lỗi
                return res.render('user/login', { error: result.EM,user:null,cart }); // Hiển thị thông báo lỗi trên giao diện
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
    myAccount: async (req, res) => {
        let user = req.user;
        let message=null
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
            let order = await Order.find({ user: user.id })
            res.render('user/myaccount', {
                order,
                cart,
                user,
                
            })
        } catch (error) {
            console.error("Lỗi à", error);
        }
    },
    signUp: async (req, res) => {
        let cart = null;
        let errorEmail=null;
        const user = req.user
        if (user) {
            cart = await Cart.findOne({ user: user.id })
        }
        res.render('user/register', { error: null,  user, cart ,errorEmail});
    },
    register: async (req, res) => {
        const { fullName, password, email } = req.body
        const checkEmail = await User.findOne({ email: email })
        let errorEmail=null;
        let cart=null
        const user = req.user
        if (checkEmail) {
            errorEmail="Email đã được sử dụng"
            res.render('user/register', {
                errorEmail,
                cart
            })
        }
        try {
            console.log("1")
            const data = await createUserService(fullName, password, email)
            if (!data) {
                return res.status(500).json({ message: "Lỗi tạo người dùng" });
            }
            let cart=await Cart.create({
                user: data.id,
                price: 0
            })
            if (!cart) {
                return res.status(500).json({ message: "Lỗi tạo cart" });
            }
            const roleAdmin = "67384eb4a18b5f553a7f4bd6"
            const roleUser = "67384ebfa18b5f553a7f4bd8"
            const userRole = await createUserRoleService(roleUser, data._id)
            if (!userRole) {
                return res.status(500).json({ message: "Lỗi tạo quyền" });
            }
            res.redirect('/login');
        } catch (error) {
            return res.status(500).json({ message: "Lỗi hệ thống. Vui lòng thử lại sau." });
        }
    },
    update: async (req, res) => {

        let img = req.file ? req.file.filename : req.body.img;
        let message=null
        const birthday = req.body.date ? new Date(req.body.date) : null;
        console.log("i ma ge", img)
        console.log("rì quẹt bo đì", req.body)
        console.log("bớt đây", birthday)
        
        try {
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {
                    fullName: req.body.fullName,
                    email: req.body.email, // status có thể là true hoặc false
                    address: req.body.address,
                    telephone: req.body.telephone,
                    gender: req.body.gender,
                    birthday: birthday,
                    img: img
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            let cart = await Cart.findOne({ user: user.id }).populate('user');
            let order = await Order.find({ user: user.id })
            message = "Cập nhật thành công"
            res.redirect("/myaccount")
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
    },
    updatePass: async (req, res) => {

        let message=""
        try {
            let user = await User.findById(req.body.userId);
            let cart = await Cart.findOne({ user: user.id }).populate('user');
            let order = await Order.find({ user: user.id })
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            const isMatchPassword = await bcrypt.compare(req.body.oldPass, user.password)
            if(isMatchPassword){
                const hashPassword = await bcrypt.hash(req.body.newPass,salt);
                user=await User.findByIdAndUpdate(user.id,{
                    password:hashPassword
                })
                message ="Đổi mật khẩu thành công"
                res.redirect('/myaccount')
            }
           else{
            message ="Mật khẩu sai"
                res.render('user/myaccount',{
                    order,
                    cart,
                    user,
                   
                })
           }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = userController;