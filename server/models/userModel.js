import mongoose from "mongoose";
import { isEmail, isMobilePhone } from "validator";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15,
        unique:true
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        validate:[isEmail,"invalid email"]
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:15
    },
    city:{
        type:String,
        required:true,

    },
    mobile:{
        type:String,
        required:true,
        validate:[isMobilePhone,"invalid phone number"]
    },
    movieBooked:[{type:mongoose.Types.ObjectId,ref :"movie"}]
},
  {timestamps:true}
)

const UserModel = mongoose.model('users',userSchema);

export default UserModel;