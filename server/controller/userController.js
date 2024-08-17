import UserModel from '../models/userModel.js'
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const userSignup = async (req,res,next) => {
    try {
        const {username,email,password,city,mobile,movieBooked,profilePic} = req.body

        if(!username || !email || !password || !city || !mobile) {
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const userExist = await UserModel.findOne({email})
        
        if(userExist){
            return res.status(400).json({success:false,message:"user already exist"})
            
        }
        
        const salt = 10
        const hashedPassword = bcyrpt.hashSync(password,salt)

        const NewUser = new UserModel({username,email,password:hashedPassword,city,mobile,movieBooked,profilePic}) 
        await NewUser.save()

        const token = jwt.sign({email:email},process.env.JWT_KEY)
 
        res.cookie('token',token)
        
        res.status(200).json({success:true,message:"user signup successfully"})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    } 
}


export const userLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body

        if( !email || !password ) {
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const userExist = await UserModel.findOne({email})
        
        if(!userExist){
            return res.status(400).json({success:false,message:"user doesn't exist"})
            
        }
        

        const passwordMatch = bcyrpt.compareSync(password,userExist.password)

        if(!passwordMatch){
            return res.status(400).json({success:false,message:"user not Authenticaed"})
        }
        
        const token = jwt.sign({email:email,},process.env.JWT_KEY)
 
        res.cookie('token',token)
        
        res.status(200).json({success:true,message:"user login successfully"})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
}

export const userProfile= async (req,res,next) => {
    try {
       const {id} = req.params
       
       const userProfileData = await UserModel.findById(id).select('-password')

       res.status(200).json({success:true,message:userProfileData})
       
       
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 



export const userLogout= async (req,res,next) => {
    try {
       
        res.clearCookie('token')

        res.json({success:true,message:"user logout"})
       
       
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export const checkUser= async (req,res,next) => {
    try {
       
      const verifiedUser = req.user;
 
      if(!verifiedUser){
        res.status(400).json({success:false,message:"user not authenticated"})
      }
      
        res.json({success:true,message:"user authenticatd"})
        
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export  const userGetALL = async (req,res) => {
    try {
        const userGetAll = await UserModel.find()

        const userLength = userGetAll.length;

        res.json({success:true,allUser:userGetAll,userlength:userLength})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}

export const userDelete = async (req,res) => {

    try {

        const {id} = req.params
        await UserModel.findByIdAndDelete(id)

        res.json({success:true,message:"your account deleted successfully"})

    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }

}