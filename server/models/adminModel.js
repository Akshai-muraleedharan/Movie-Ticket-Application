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
    
},
  {timestamps:true}
)

const AdminModel = mongoose.model('admin',adminSchema);

export default AdminModel;