const User=require('../model/Usermodel')
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('../config/config')

const SecurePassword=async(password)=>{
    try{ 
       const HashPassword=await bcryptjs.hash(password,10);
       return HashPassword;
      }catch(error){
          res.status(400).json(error.message)
      }
}

const CreateToken=async(id)=>{
    try{ 
      const token= await jwt.sign({_id:id},config.secrect_key,{expiresIn:"1h"});
      return token;
       
      }catch(error){
          res.status(400).json(error.message)
      }
}


const register_user=async(req,res)=>{
    try{
        const Passwordhash=await SecurePassword(req.body.password)
      const UserData=await  User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:Passwordhash,
            image:req.file.filename,
            type:req.body.type,
        });
       const duplicateEmail=await User.findOne({email:req.body.email})
       if(duplicateEmail){
        res.status(400).json({success:false,message:"email already exist"});
       }else{
       const user_data= await UserData.save();
       const token=await CreateToken(user_data._id);

      res.status(200).json({success:true,message:"register successfully",data:user_data,"token":token});
       }

    }catch(error){
        res.status(400).json(error.message)
    }
 
}



module.exports={
    register_user
}