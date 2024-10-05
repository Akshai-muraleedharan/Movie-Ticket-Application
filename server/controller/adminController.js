
import { createToken } from "../utils/generateToken.js";
import AdminModel from "../models/adminModel.js";
import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import { matchPassword } from "../utils/comparePassword.js";
import UserModel from "../models/userModel.js";
import OwnerModel from "../models/theaterOwnerModel.js";
import TheaterModel from "../models/theaterModel.js";
import NewMovieModel from "../models/newMovieModel.js";
import { sendEmail } from "../middleware/emailConfig.js";






// admin login
export const adminLogin = async (req, res, next) => {
  try {
        
    // data from client-side
        const { email, password } = req.body;

        // to check the data is empty
        if (!email || !password) {
          return res .status(400).json({ success: false, message: "All fields are required" });
        }

        // to find the admin account exist
        const adminExist = await AdminModel.findOne({ email });

      
        if (!adminExist ) {
          return res .status(400) .json({ checkUser: false, message: "admin doesn't exist" });
        }
          // To check the admin is soft delete
        const deletedAdmin = adminExist.active

        if (deletedAdmin == true) {
          return res.status(400).json({ checkUser: false, message: "You are InActive" });
        }

        const PasswordValue = adminExist.password

        // To forward the password for compare for login
        const passwordMatch = matchPassword(password,PasswordValue)
        
        if (!passwordMatch) {
          return res .status(400) .json({ success: false, message: "invalid password" });
        }

        // Token create for  authentication and set role 
        const token = createToken(email, "admin");

        // created token save in cookies in frontend
        res.cookie("token", token,{
          sameSite: "None",
          secure: true,
          httpOnly: true,
        });

        res .status(200) .json({ success: true, message: "admin login successfully" });
  } catch (error) {
   
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};


// admin get all
export const adminGet = async(req,res) => {
  try {
    const adminFetch = await AdminModel.find();

    if(!adminFetch){
      return res.status(400).json({success:false,message:"could not fetch"})
    }

     res.json({success:true,message:"fetched successfully", data:adminFetch})
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
}


// admin profile updation
export const adminUpdate = async (req, res) => {
    try {
      const { username,email } = req.body;
      const  verifiedAdmin  = req.admin.email;
      let image;

      const admin = await AdminModel.findOne({email:verifiedAdmin})
      // This condition for check the update profile-pic
     
      if (!req.file) {
        if(admin.profilePic === admin.profilePic){
          image = admin.profilePic
        }else{
          image = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
        }
      
      } else {
        image = req.file.path;
      }

        // The profile pic uplods cloudinary
      const uploadResult = await cloudinaryInstance.uploader
        .upload(image, { folder: "movie ticket application/admin profile" })
        .catch((error) => {
          res.status(error.status|| 400).json(error.message ||  "cloudinary server error")
        });
        
        // update the admin profile
      await AdminModel.findOneAndUpdate({email:verifiedAdmin},{ username, profilePic: uploadResult.url,email},{ new: true });

      res.json({success: true,message: "updated successessfully", });
    } catch (error) {
      res.status(error.status || 500).json({ message: error || "internal server error" });
    }
};

// admin profile
export const adminProfile = async (req, res, next) => {
  try {

    const  verifiedAdmin  = req.admin.email;

      //  to find the acccount for fetching
    const adminProfileData = await AdminModel.findOne({email:verifiedAdmin}).select( "-password");

    if (!adminProfileData) {
      return res.status(400).json({ success: false, message: "no account" });
    }

    res.json({ success: true, message: "data fetched" ,data:adminProfileData });
  } catch (error) {
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin logout
export const adminLogout = async (req, res, next) => {
  try {
   
  
    // to clear cookie
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'None' });
    res.json({ success: true, message: "admin logout" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin authentication check
export const checkAdmin = async (req, res, next) => {
  try {
    // to check admin authenticate this value from token verification
    const verifiedAdmin = req.admin;

    if (!verifiedAdmin) {
      return res.status(400).json({ success: false, message: "admin not authenticated" });
    }
    res.json({ success: true, message: "admin authenticatd" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin hard delete
export const adminDelete = async (req, res) => {
  try {
    const verifiedAdmin = req.admin.email;
    //  account exist for delete
    const accountExist = await AdminModel.findOne({email:verifiedAdmin});

    if (!accountExist) {
      return res .status(400).json({ success: false, message: "your account could not delete now" });
    } else {
      // delete the account
      await AdminModel.findOneAndDelete({email:verifiedAdmin});
      res.clearCookie("token");
      res.json({ success: true, message: "your account deleted successfully" });
    }
  } catch (error) {
    res .status(error.status || 500) .json({ message: error || "internal server error" });
  }
};



// user delete by admin
export const userDeleteByAdmin = async (req, res) => {
  try {
   
      const {id} = req.params 

      if(!id){
        return res.status(200).json({success:false,message:"id not get"})
      }
    
    await UserModel.findByIdAndDelete(id);
    res.json({ success: true, message: "user deleted successfully" });
    
    
  } catch (error) {
   
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }

}


 export const AdminTheaterOwnerDelete = async (req,res) => {
 
  try {

     const {id} =req.params

     const owner = await OwnerModel.findById(id)
     const theaterId = await TheaterModel.findOne({Ownermail:owner.email})

     let idOfTheater = theaterId._id.toString()
  
       const movie = await NewMovieModel.findOne({theaterId:idOfTheater})

       await OwnerModel.findOneAndDelete({email:owner.email})
       await TheaterModel.findOneAndDelete({Ownermail:owner.email})
       await NewMovieModel.findOneAndDelete({theaterId:idOfTheater})
   
      
 
      res.json({ success: true, message: "theater owner deleted successfully" });

  } catch (error) {
      res.status(error.status || 500).json({message:error || "internal server error"})
      
  }

}

export const changeRole = async (req,res) => {
  try{

    const {id} = req.params;
    const {Role} = req.body;

    if(!id){
      return res.status(400).json({success:false,message:"id not get"})
    }

    
    const userCheck = await UserModel.findById(id)
    const ownerCheck = await OwnerModel.findById(id)
   
    if(userCheck && userCheck.role === "user"){
      if(Role === "admin"){
        sendEmail(userCheck.email,"Welcome admin",` Welcome, ${userCheck.username} now you are a sub-admin `)
     const newAdmin = await AdminModel({
      username:userCheck.username,
      email:userCheck.email,
      password:userCheck.password,
      profilePic:userCheck.profilePic,
      adminDeleted:userCheck.userDeleted,
      mobile:userCheck.mobile

    })
    await UserModel.findByIdAndDelete(id)
    await newAdmin.save()
   
   
    res.status(200).json({success:true,message:"role change successfully"})
      }
   
    }else if(ownerCheck && ownerCheck.role === "owner"){
      sendEmail(ownerCheck.email,"Welcome admin",` Welcome, ${ownerCheck.username} now you are a sub-admin `)
          if(Role === "admin"){
            const newAdmin = await AdminModel({
              username:ownerCheck.username,
              email:ownerCheck.email,
              password:ownerCheck.password,
              profilePic:ownerCheck.profilePic,
              adminDeleted:ownerCheck.userDeleted,
              mobile:ownerCheck.mobile
            })
            await OwnerModel.findByIdAndDelete(id)
            await newAdmin.save()
        
           
            res.status(200).json({success:true,message:"role change successfully"})
          }
    }

  
  
  }catch(error){
    res.status(error.status || 500).json({message:error || "internal server error"})
   
  }
} 


export const subAdminDelete = async (req,res) => {
  try{
    const verifiedAdmin  = req.admin.email;
    const {id} = req.params
    const admin = await AdminModel.findOne({email:verifiedAdmin})
    const adminPosition = admin.Position

    if(adminPosition !== "super-admin"){
      return res.status(400).json({success:false,message:"you have not authorise to delete admins"})
    }

    if(adminPosition === "super-admin"){
       await AdminModel.findByIdAndDelete(id)
       res.status(200).json({success:true,message:"sub admin delete successfully"})
    }
  }catch(error){
    res.status(error.status || 500).json({message:error || "internal server error"})
    
  }
}


export const usersInActive = async (req,res) => {
  try{

    const {id} =req.params

    if(!id){
      return res.status(400).json({success:false,message:"id not get"})
    }

    const userCheck = await UserModel.findById(id)
    const ownerCheck = await OwnerModel.findById(id)
    const adminCheck = await AdminModel.findById(id)

    

    if(userCheck && userCheck.role === "user"){

      await UserModel.findByIdAndUpdate(id,{active:true},{new:true})
      res.status(200).json({success:true,message:"user inActive successfully"})

    }else if(ownerCheck && ownerCheck.role === "owner"){

      await OwnerModel.findByIdAndUpdate(id,{active:true},{new:true})
      res.status(200).json({success:true,message:"owner inActive successfully"})

    }else if(adminCheck && adminCheck.role === "admin"){
     
      await AdminModel.findByIdAndUpdate(id,{active:true},{new:true})
      res.status(200).json({success:true,message:"admin inActive successfully"})

    }else{

      res.status(400).json({success:false,message:"could not inActive"})

    }

  }catch(error){
    res.status(error.status || 500).json({message:error || "internal server error"})
    
  }
}



export const usersActive = async (req,res) => {
  try{

    const {id} =req.params

    if(!id){
      return res.status(400).json({success:false,message:"id not get"})
    }

    const userCheck = await UserModel.findById(id)
    const ownerCheck = await OwnerModel.findById(id)
    const adminCheck = await AdminModel.findById(id)

    

    if(userCheck && userCheck.role === "user"){

      await UserModel.findByIdAndUpdate(id,{active:false},{new:true})
      res.status(200).json({success:true,message:"user Active  successfully"})

    }else if(ownerCheck && ownerCheck.role === "owner"){

      await OwnerModel.findByIdAndUpdate(id,{active:false},{new:true})
      res.status(200).json({success:true,message:"owner Active  successfully"})

    }else if(adminCheck && adminCheck.role === "admin"){
     
      await AdminModel.findByIdAndUpdate(id,{active:false},{new:true})
      res.status(200).json({success:true,message:"admin Active  successfully"})

    }else{

      res.status(400).json({success:false,message:"could not inActive"})

    }

  }catch(error){
    res.status(error.status || 500).json({message:error || "internal server error"})
   
  }
}

