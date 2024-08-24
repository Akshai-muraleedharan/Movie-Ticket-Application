

import { createToken } from "../utils/generateToken.js";
import AdminModel from "../models/adminModel.js";
import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import { hashPassword } from "../utils/hashedPassword.js";
import { matchPassword } from "../utils/comparePassword.js";
import otpGenerator from "otp-generator";
import OtpModel from "../models/otpModel.js";
export const adminSignup = async (req, res) => {
  try {
    const { username, email, password, profilePic, confirmPassword,city,mobile } = req.body;

    const adminExist = await AdminModel.findOne({ email });

    if (adminExist) {
      return res
        .status(400)
        .json({ success: false, message: "admin already exist" });
    }

    const totalAdmin = await AdminModel.find();
    const adminLength = totalAdmin.length + 1;

    if (adminLength > 4) {
      return res
        .status(400)
        .json({ success: false, message: "maximum number of admins added" });
    }

    const hashedPassword = hashPassword(password);

    const NewAdmin = new AdminModel({
      username,
      email,
      password: hashedPassword,
      profilePic,
      city,
      mobile
    });
    await NewAdmin.save();

    const token = createToken(email, "admin");

    res.cookie("token", token);

    res
      .status(200)
      .json({ success: true, message: "admin signup successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};


export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const adminExist = await AdminModel.findOne({ email });


    const deletedAdmin = adminExist.adminDeleted;
    if (!adminExist || deletedAdmin === true) {
      return res
        .status(400)
        .json({ success: false, message: "admin doesn't exist" });
    }

    const PasswordValue = adminExist.password

    const passwordMatch = matchPassword(password,PasswordValue)
    
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }

    const token = createToken(email, "admin");

    res.cookie("token", token);

    res
      .status(200)
      .json({ success: true, message: "admin login successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};



export const adminUpdate = async (req, res) => {
  const { username } = req.body;
  const { verifiedAdmin } = req.admin;
  let image;

  const admin = await AdminModel.findOneAndUpdate(verifiedAdmin);

  if (!req.file) {
    image =
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
  } else {
    image = req.file.path;
  }
  const uploadResult = await cloudinaryInstance.uploader
    .upload(image, { folder: "movie ticket application/admin profile" })
    .catch((error) => {
      console.log(error);
    });

  const updatedData = await AdminModel.findOneAndUpdate(
    admin,
    {
      username,
      profilePic: uploadResult.url,
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "updated successessfully",
    data: updatedData,
  });
};

export const adminProfile = async (req, res, next) => {
  try {
    const { verifiedAdmin } = req.admin;

    const adminProfileData = await AdminModel.findOne(verifiedAdmin).select(
      "-password"
    );

    if (!adminProfileData) {
      return res.status(400).json({ success: false, message: "no account" });
    }

    res.status(200).json({ success: true, message: adminProfileData });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ success: true, message: "admin logout" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const verifiedAdmin = req.admin;

    if (!verifiedAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "admin not authenticated" });
    }
    res.json({ success: true, message: "admin authenticatd" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const adminDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const accountExist = await AdminModel.findById(id);

    if (!accountExist) {
      return res
        .status(400)
        .json({ success: false, message: "your account could not delete now" });
    } else {
      res.clearCookie("token");
      await AdminModel.findByIdAndDelete(id);
      res.json({ success: true, message: "your account deleted successfully" });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// admin soft delete start


export const adminSoftDelete = async (req, res) => {
  try {

    
    const verifiedAdmin = req.admin.email;

    if (!verifiedAdmin) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    const adminExist = await AdminModel.findOne({ email: verifiedAdmin });

    const userDelete = await AdminModel.findOneAndUpdate( adminExist,{ adminDeleted: true,}, { new: true });
    res.clearCookie("token");
    await userDelete.save();

    res.json({success:true,message:"user delete successfully"  });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500) .json({ message: error || "internal server error" });
  }
}; 

export const adminOtpGenerate = async (req, res) => {
  try {
    const { mobile } = req.body;

  const validMobile = await AdminModel.findOne({ mobile });

  if (!validMobile) {
    return res.status(200).json({ success: false, message: "invalid number" });
  }
  const otp = otpGenerator.generate(6, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false,});

  const generatedOtp = await OtpModel({mobile,otp:otp})

  await generatedOtp.save()

  res.json({success:true,message:"otp generated successfull"})
  } catch (error) {
    console.log(error)
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }

};

export const adminAccoutRestore = async (req, res) => {
  try {
    const { mobile,otp} = req.body;
     if(!mobile || !otp) return res.json({success:false,message:"all fields required"})
      
     const validOtp =await OtpModel.findOne({mobile,otp})


    if (!validOtp) {
      return res.status(200).json({ success: false, message: "invalid otp" });
    }else{
      const accountRestore = await AdminModel.findOneAndUpdate({mobile},{
        adminDeleted: false,
      },{new:true})
      await accountRestore.save(); 
    }

    res.json({success:true,message:"your account restore successfully"})
  } catch (error) {
    console.log(error)
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin soft delete and account-restore end 