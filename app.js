const mongoose=require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router_category = require('./router/category.router');
const router_brand = require('./router/brand.router');
const router_banner= require('./router/banner.router');
const router_product= require('./router/product.router');
const roleRoute=require('./router/api/role.route.api');
const userRoute=require('./router/api/user.route.api');
const cartRoute=require('./router/api/cart.route.api');
const detailCartRoute=require('./router/api/detailCart.route.api');
const loginRoute=require('./router/api/login.route.api');
const homeRoute=require('./router/home.router');
const methodPayRoute=require('./router/methodPay.router');
const addressRoute=require('./router/api/address.route.api');
const discountCodeRoute=require('./router/discountCode.router');
const orderRoute=require('./router/order.router');
const orderApiRoute=require('./router/api/order.route.api');
const cookieParser = require('cookie-parser');
var app=express();
app.use(cookieParser());
const authWeb = require('./middleware/authWeb');

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');
let multer=require("multer");
app.use('/static', express.static(path.join(__dirname, 'view/static')));
app.set('view engine', 'ejs');
app.set('views',"./view")
app.use(express.json())

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'view', 'static', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Import và cấu hình router

app.locals.cache = false;
app.use("/api/role",roleRoute)
app.use("/api/user",userRoute)
app.use("/api",loginRoute)
app.use("/api/address",addressRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderApiRoute)
app.use("/api/detailCart",detailCartRoute)
app.use(authWeb);
app.use('/admin/category', router_category(upload)); 

// app.use('/admin/discountCode', router_discountCode); 
app.use('/admin/brand', router_brand(upload)); 
app.use('/admin/banner', router_banner(upload)); 
app.use('/admin/product', router_product(upload));
app.use('/admin/methodPay', methodPayRoute);
app.use('/admin/discountCode', discountCodeRoute);
app.use('/admin/order', orderRoute);
app.use('', homeRoute); 

app.listen(3000);

mongoose.connect("mongodb://localhost:27017/tmdt").then(()=>{
    console.log("ket noi thanh cong")
})