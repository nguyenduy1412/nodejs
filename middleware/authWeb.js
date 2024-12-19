const jwt = require('jsonwebtoken');
require('dotenv').config();
const User=require('../model/users.model')
const UserRole=require('../model/usersRole.model')
const authWeb = async (req, res, next) => {
    const token = req.cookies?.token;
    const currentUrl = req.path;
    const exemptPaths = ["/api/"];
    if (exemptPaths.some(path => req.path.startsWith(path))) {
        // console.log("Vào không")
      return next(); // Bỏ qua middleware cho các đường dẫn này
    }
    req.user = null;
    let whiteList = ["/product-detail","/product","/category","/login","/register","/find-category","/product"];
    let blackList =["/admin","/cart","/checkout","/myaccount","/order-detail","/add-rating"];
    // console.log("có token không",token)
   
    if(!token){
        req.user = null;
        if(blackList.some(pattern => currentUrl.startsWith(pattern))){
            return res.status(401).redirect('/login');
        }
       
        if (whiteList.some(pattern => currentUrl.includes(pattern)) ) {         
            return next(); // Nếu URL hợp lệ, tiếp tục xử lý
        }
        if(currentUrl==="/"){
            return next(); //
        }
        
        
        return res.status(401).redirect('/login');
    }
    else{
        // console.log("Token lè:",token);
        // console.log(currentUrl)
        try {
            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           
            // Lấy thông tin user và vai trò
            const user = await User.findOne({ email: decoded.email });
            req.user = user;
            const userRole = await UserRole.findOne({ user: user._id }).populate('role');
           
            if (!userRole) {
                return res.status(403).send('Vai trò của bạn không được xác định.');
            }
            // console.log('ĐAY a1')
            // Kiểm tra quyền
            // console.log("user ",req.user);
            if(currentUrl.startsWith('/admin')){
                // console.log("Quyền",userRole.role.roleName);
                if (userRole.role.roleName === 'USER' ) {
                    return res.status(403).send('Bạn không có quyền .');
                }
                
                if(userRole.role.roleName === 'ADMIN'){
                    return next();
                }
            }else{
                // console.log("vào đấy khong ",req.user);
                return next();
            }

            // Vai trò không hợp lệ
            return res.status(401).send(error );
        } catch (error) {
            // console.log('ĐAY a')
            return res.status(401).send(error );
            
        }
    }
   
    
    
    
};



    module.exports = authWeb;
