const jwt=require('jsonwebtoken')
require("dotenv").config()

const auth = (req, res, next) => {

    const whiteList=["/","/register","/login","/user"]
    if(whiteList.find(item =>'/api' + item === req.originalUrl)){
        next();
    }else{
        if(req.headers && req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decode=jwt.verify(token, process.env.JWT_SECRET)
                console.log("Checkk decode ",decode);
                next();
            } catch (error) {
                return res.status(401).json({
                    message:"Token hết hạn/hoặc không hợp lệ"
                })
            }
           
           
        }else{
            return res.status(401).json({
                message:"Bạn chưa truyền token"
            })
        }
    }
   


}

module.exports = auth