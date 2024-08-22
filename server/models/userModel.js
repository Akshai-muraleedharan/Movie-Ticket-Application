import mongoose from "mongoose";
import validatorPkg from 'validator';
const { isEmail } = validatorPkg;

const userSchema = new mongoose.Schema({
    username:{
        type:String,  
        required:true, 
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
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    city:{
        type:String,
        required:true,
    },
    userDeleted:{
        type:Boolean,
        default:false
    },
    mobile:{
        type:String,
        required:true,  
    },
    movieBooked:[{type:mongoose.Types.ObjectId,ref :"movieTicket"}]
},
  {timestamps:true}
)

const UserModel = mongoose.model('users',userSchema);

export default UserModel;