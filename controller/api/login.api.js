
const User=require('../../model/users.model');    
const UserRole=require('../../model/usersRole.model');    
const { createUserService,loginService } = require('../../service/user.service');
const { createUserRoleService } = require('../../service/userRole.service');

const getUser= async (req, res) => {

    try{
        const users= await User.find({})
        const userRole = await UserRole.find({ }).populate('role');
        res.status(200).json(userRole)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const register= async (req, res) => {
    const {fullName,password,email} = req.body
    const checkEmail= await User.findOne({email: email})
    if(checkEmail){
        return res.status(400).json({ message: "Email đã được sử dụng." });
    }
    try{
        const data= await createUserService(fullName,password,email)
        if(!data){
            return res.status(500).json({ message: "Lỗi tạo người dùng" });
        }
        const roleAdmin="67384eb4a18b5f553a7f4bd6"
        const roleUser="67384ebfa18b5f553a7f4bd8"
        const userRole= await createUserRoleService(roleUser,data._id)
        if(!userRole){
            return res.status(500).json({ message: "Lỗi tạo quyền" });
        }
        res.status(200).json(data)
    }catch(error){
        return res.status(500).json({ message: "Lỗi hệ thống. Vui lòng thử lại sau." });
    }
   
    
}

const login= async (req, res) => {

   const {email,password} = req.body
   const data= await loginService(email,password)
   return res.status(200).json(data)
}
const deleteUser= async (req, res) => {

    try{
        const {id} = req.params;
       const user= await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:"user not found"});
        } 
        res.status(200).json({message:"user deleted successful"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getUser,register,deleteUser,login
}