const User=require('../model/users.model');  
const bcrypt=require('bcrypt');
const salt=10
const jwt=require('jsonwebtoken')
require("dotenv").config()

const createUserService = async (fullName,password,email) => {
    try {
        
        // hash user password
        const hashPassword = await bcrypt.hash(password,salt);
        let result = await User.create({
            fullName: fullName,
            password:hashPassword,
            email:email
        })
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const loginService= async (email,password) => {
    try {
        // hash user password
        console.log(email)
        const user = await User.findOne({email: email})
        if(user) {
            const isMatchPassword = await bcrypt.compare(password,user.password)
            if(!isMatchPassword) {
                return{
                    EC:2,
                    EM:"Emai hoặc pass không hợp lệ"
                }
            }else{
                //tạo access token 
                const payLoad={
                    email:user.email,
                    fullName:user.fullName
                }
                const accessToken=jwt.sign(
                    payLoad,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    accessToken,
                    user:{
                        email:user.email,
                        fullName:user.fullName
                    }
                }
            }
        }else{
            return {
                EC:1,
                EM:"Emai hoặc pass không hợp lệ"
            }
        }
    } catch (error) {
        return {
            EC:3,
            EM:"lỗi tạo tài khoản"
        }
    }
}
module.exports = {createUserService,loginService}