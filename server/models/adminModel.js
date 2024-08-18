import mongoose from 'mongoose'
import validatorPkg from 'validator';
const { isEmail } = validatorPkg;

const adminSchema = new mongoose.Schema({
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
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    }
    
},
  {timestamps:true}
)

const AdminModel = mongoose.model('admin',adminSchema);

export default AdminModel;