import NewMovieModel from '../models/newMovieModel.js';
import RatingModel from '../models/ratingModel.js';
import UserModel from "../models/userModel.js";


export const movieRatingCreate = async (req,res) => {
    try {
        const {movieId} = req.params
        const verifiedUser = req.user.email;
        const {comment} =req.body
        const User = await UserModel.findOne({email:verifiedUser})    
        const userId = User._id
        const usermail = User.email
 
         
        
        if(!movieId){
            return res.status(400).json({success:false,message:"id not exist"})
        }

        if(!comment){
            return res.status(400).json({success:false,message:"review required"})
        }

        const commentLowerCase = comment.toLowerCase()
 
        const movie = await NewMovieModel.findById(movieId)

        const movieName = movie.title
     
        const UserRating = await RatingModel({ username:userId,comment:commentLowerCase,movie:movieId,usermail,movieName:movieName})

      const data = await UserRating.save()

            res.status(200).json({success:true,message:"successfully created",data:data})
    } catch (error) {
       
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}


export  const movieRatingGet = async  (req,res) => {
    try{
        const {movieId} = req.params;

        const allComment = await RatingModel.find({movie:movieId})
        .populate( {  path: "username",select:['-password','-profilePic','-movieBooked','-userDeleted','-mobile','-city']})

        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}

// for admin

export  const movieRatingGetAdmin = async  (req,res) => {
    try{
        
      
        const allComment = await RatingModel.find()
       
        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}
export  const movieRatingGetAll = async  (req,res) => {
    try{

        const allComment = await RatingModel.find()
        .populate( {  path: "username",select:['-password','-profilePic','-movieBooked','-userDeleted','-mobile','-city']})
        .populate({path:'movie',model:'movies',select:['-showTime','-duration','-genres','-image','-theaterId','-language']})
        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}


export  const movieRatingUpdate = async  (req,res) => {
    try{
        const {id} = req.params;
        const {comment} =req.body
   
        let commentLowerCase = comment.toLowerCase()

        if(!comment || comment === ""){
            return res.status(400).json({success:false,message:"Please fill the field"})
        }

         await RatingModel.findByIdAndUpdate(id,{
            comment:commentLowerCase
        },{new:true})
        

        res.status(200).json({success:true,message:"updated successfully"})

    }catch(error){
      
       res.status(error.status || 500).json({ message: error || "internal server error" });
    } 
}



export  const movieRatingDelete = async  (req,res) => {
    try{
        const {id} = req.params;
       
       
            const ratingUpdate = await RatingModel.findByIdAndDelete(id)
              res.status(200).json({success:true,message:"deleted successfully",data:ratingUpdate})
          
        
        

      

    }catch(error){
     
       res.status(error.status || 500).json({ message: error || "internal server error" });
    } 
}