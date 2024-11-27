const User=require('../model/usersRole.model');  
const bcrypt=require('bcrypt');
const salt=10
const jwt=require('jsonwebtoken');
const UserRole = require('../model/usersRole.model');
require("dotenv").config()

const createUserRoleService = async (roleId,userId) => {
    try {
        let result = await User.create({
            user: userId,
            role:roleId
        })
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const deleteUserRoleService = async (id) => {
    try {
      // Tìm và xóa userRole theo ID
      const deletedUserRole = await UserRole.findByIdAndDelete(id);
      if (!deletedUserRole) {
        throw new Error('UserRole không tồn tại');
      }
      return deletedUserRole; // Trả về userRole đã bị xóa
    } catch (error) {
      console.error('Lỗi khi xóa userRole:', error.message);
      throw new Error(error.message);
    }
  }
module.exports = {createUserRoleService,deleteUserRoleService}