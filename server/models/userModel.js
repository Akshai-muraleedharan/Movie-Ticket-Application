import mongoose from "mongoose";
import validatorPkg from 'validator';
const { isEmail } = validatorPkg;

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15,
      
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required:true,
        validate:[isEmail,"invalid email"]
    },
    password:{
        type:String,
        required:[true,"password is requird"],
       
        
    },
    profilePic:{
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s",
    },
    city:{
        type:String,
        required:true,

    },
    mobile:{
        type:String,
        required:true,
        
    },
    movieBooked:[{type:mongoose.Types.ObjectId,ref :"movie"}]
},
  {timestamps:true}
)

const UserModel = mongoose.model('users',userSchema);

export default UserModel;