import OwnerModel from '../models/theaterOwnerModel.js'
import bcyrpt from 'bcrypt'
import { createToken } from '../utils/generateToken.js'


export const ownerSignup = async (req,res) => {
    try {
       
        const {username,email,password,profilePic} = req.body

        if(!username || !email || !password ) {
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const userExist = await OwnerModel.findOne({email})
        
        if(userExist){
            return res.status(400).json({success:false,message:"user already exist"})
            
        }
        
        const salt = 10
        const hashedPassword = bcyrpt.hashSync(password,salt)

        const NewUser = new OwnerModel({username,email,password:hashedPassword,profilePic}) 
        await NewUser.save()

        const token = createToken(email,"owner")
 
        res.cookie('token',token)
        
        res.status(200).json({success:true,message:"owner signup successfully"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    } 
}



export const ownerLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body

        if( !email || !password ) {
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const userExist = await OwnerModel.findOne({email})
        
        if(!userExist){
            return res.status(400).json({success:false,message:"owner doesn't exist"})
            
        }
        

        const passwordMatch = bcyrpt.compareSync(password,userExist.password)

        if(!passwordMatch){
            return res.status(400).json({success:false,message:"owner not Authenticaed"})
        }
        
        const token = createToken(email,"owner")
 
        res.cookie('token',token)
        
        res.status(200).json({success:true,message:"owner login successfully"})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
}



export const ownerProfile= async (req,res,next) => {
    try {
       const {id} = req.params
       
       const ownerProfileData = await OwnerModel.findById(id).select('-password')
   
    
       res.status(200).json({success:true,message:ownerProfileData})
       
       
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export const ownerLogout= async (req,res,next) => {
    try {
           
        res.clearCookie('token')

        res.json({success:true,message:"owner logout"})
       
       
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 

export const checkOwner= async (req,res,next) => {
    try {
       
      const verifiedOwner = req.owner;
   console.log(verifiedOwner,'owner')
      if(!verifiedOwner){
      return  res.status(400).json({success:false,message:"owner not authenticated"})
      }
      res.json({success:true,message:"owner authenticatd"})
     
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export const ownerDelete = async (req,res) => {

    try {

        const {id} = req.params
   
   
        const accountExist = await OwnerModel.findById(id)

        if(!accountExist){
            return res.status(400).json({success:false,message:"your account could not delete now"})
        }else{
            await OwnerModel.findByIdAndDelete(id)
            res.json({success:true,message:"your account deleted successfully"})
        }

      

    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }

}