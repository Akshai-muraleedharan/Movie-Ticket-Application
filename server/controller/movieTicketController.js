import MovieTicket from "../models/movieTicketModel.js"
import UserModel from '../models/userModel.js'


export const movieTicket = async (req,res) => {

try {
   
    const {seatArry,payment,totalPrice,paymentType,showTime,showDate} = req.body
    // const {user} =req.params
    const  verifiedUser  = req.user.email;
    const {movie} =req.params
    const {theater} =req.params
    
    if( !movie || !theater){
        return res.status(400).json({success:false,message:'user not valid'})
    }
  
    const secureUser = await UserModel.findOne({email:verifiedUser})

    const user = secureUser._id
    

    // if(!seatArry){
    //     return res.status(400).json({success:false,message:"seats not selected"})
    // }

    const newMovieTicket = new MovieTicket({
        
        movieId:movie,
        theaterId:theater,
         userId:user,
        seats:seatArry,
        payment,
        totalPrice, 
        paymentType,
        showTime,
        showDate
    })
    await newMovieTicket.save() 

    secureUser.movieBooked.push(newMovieTicket)

    await secureUser.save()

    res.json({success:true,message:"payment successfully completed",data:newMovieTicket})
  

} catch (error) {
     console.log(error)
    res.status(error.status || 500).json({message:error || "internal server error"})
       
}


} 


export const ticketTest = async (req,res) => {
    try {
       const {user} = req.params
       const {theater} =req.params
       console.log(user)
       console.log(theater,'theater')
       
    } catch (error) {
        console.log(error)
    }
}


export const totalPaymentList = async (req,res) => {
    try {
        const ticketList = await MovieTicket.find()

        if(!ticketList){
            return res.status(400).json({success:false,message:"no payments"})
        }else{
            res.json({success:true,message:ticketList})
        }
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}