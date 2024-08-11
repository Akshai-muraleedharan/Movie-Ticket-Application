import mongoose from 'mongoose';
const mongodbUrl = process.env.MONGO_URL;

 const dbConnect = async () => {
    await mongoose.connect(mongodbUrl)
    console.log("mongodb connect successfully")
 }

 export default dbConnect;