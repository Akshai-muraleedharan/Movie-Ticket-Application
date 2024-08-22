import UserModel from "../models/userModel.js";
import {matchPassword} from '../utils/comparePassword.js'
import { createToken } from "../utils/generateToken.js";
import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import { hashPassword } from "../utils/hashedPassword.js";

export const userSignup = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      city,
      mobile,
      movieBooked,
      profilePic,
      confirmPassword,
    } = req.body;

    if (!username || !email || !password || !city || !mobile || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password does not match" });
    }

    const userExist = await UserModel.findOne({ email });


  
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
   
    const hashedPassword = hashPassword(password);

    const NewUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      city,
      mobile,
      movieBooked,
      profilePic,
     
    });

    await NewUser.save();
    
    const token = createToken(email,'user',);

    res.cookie("token", token);

    res
      .status(200)
      .json({
        success: true,
        message: "user signup successfully",
        date: NewUser,
      });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExist = await UserModel.findOne({ email });
   
    
   const deletedUser = userExist.userDeleted

   

    if (!userExist || deletedUser === true) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exist" });
    }

    const PasswordValue = userExist.password

    const passwordMatch = matchPassword(password,PasswordValue)

    if (!passwordMatch) {
      return res 
        .status(400)
        .json({ success: false, message: "user not Authenticaed" });
    }
  
    const token = createToken(email,'user');

    res.cookie("token", token);

    res.status(200).json({ success: true, message: "user login successfully" });
  } catch (error) {
    console.log(error)
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { username, city, mobile } = req.body;
    const { id } = req.params;
    let image;

    if (!req.file) {
      image =
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
    } else {
      image = req.file.path;
    }
    const uploadResult = await cloudinaryInstance.uploader
      .upload(image, { folder: "movie ticket application/user profile" })
      .catch((error) => {
        console.log(error);
      });

    const updatedData = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        city,
        mobile,
        profilePic: uploadResult.url,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const { verifiedUser } = req.user;

    const userProfileData = await UserModel.findOne(verifiedUser).select(
      "-password"
    );

    if (!userProfileData) {
      return res.status(400).json({ success: false, message: "no account" });
    }

    res.status(200).json({ success: true, message: userProfileData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const bookedMovies = async (req, res) => {
  try {
    const { verifiedUser } = req.user;

    // doubt this area
    const user = await UserModel.findOne(verifiedUser)
      .populate([
        {
          path: "movieBooked",
          populate: {
            path: "movieId",
            model: "movies",
          },
        },
      ])
      .populate([
        {
          path: "movieBooked",
          populate: {
            path: "theaterId",
            model: "theater",
          },
        },
      ]);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not exist" });
    }

    const movieBooked = user.movieBooked;

    if (movieBooked.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No movie booked" });
    }

    res.json({
      success: true,
      message: "successfully fetched",
      data: movieBooked,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ success: true, message: "logout successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const verifiedUser = req.user;

    if (!verifiedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not authenticated" });
    }

    res.json({ success: true, message: "user authenticatd" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userGetALL = async (req, res) => {
  try {
    const userGetAll = await UserModel.find();

    const userLength = userGetAll.length;

    res.json({ success: true, allUser: userGetAll, userlength: userLength });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const accountExist = await UserModel.findById(id);

    if (!accountExist) {
      return res
        .status(400)
        .json({ success: false, message: "your account could not delete now" });
    } else {
      res.clearCookie("token");
      await UserModel.findByIdAndDelete(id);
      res.json({ success: true, message: "your account deleted successfully" });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};



export const userSoftDelete = async (req,res) => {
  try {
    const verifiedUser = req.user.email;


    if (!verifiedUser) {
      return res.status(400).json({ error: 'User not authenticated' });
  }
    const userExist = await UserModel.findOne({email:verifiedUser})

    

    const userDelete = await UserModel.findOneAndUpdate(userExist,{
      userDeleted:true
    },{new:true})
    res.clearCookie("token");
    await userDelete.save()

    res.json({data:userDelete}) 
  } catch (error) {
    console.log(error)
    res.status(error.status || 500)
    .json({ message: error || "internal server error" });
  }
}