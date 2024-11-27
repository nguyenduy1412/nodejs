
const Role=require('../../model/role.model');    

const getRole= async (req, res) => {

    try{
        const roles= await Role.find({})
        res.status(200).json(roles)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const createRole= async (req, res) => {
    console.log(req.body);
    try{
        const roles= await Role.create(req.body)
        res.status(200).json(roles)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateRole= async (req, res) => {

    try{
        const {id} = req.params;
        console.log(id)
        const role= await Role.findByIdAndUpdate(id,req.body);
        if(!role){
            return res.status(404).json({message:"Role not found"});
        }
        const updateRole= await Role.findById(id)
        res.status(200).json(updateRole)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
const deleteRole= async (req, res) => {

    try{
        const {id} = req.params;
        const role= await Role.findByIdAndDelete(id);
        if(!role){
            return res.status(404).json({message:"Role not found"});
        }
        res.status(200).json({message:"Role deleted successful"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports ={
    getRole,createRole,deleteRole,updateRole
}