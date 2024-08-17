import MovieTicket from "../models/movieTicketModel.js"



export const movieTicket = async (req,res) => {

try {
   
    
    const {showTime,showDate,movieId,movieShowId,userId,seats,payment,totalPrice,paymentType} = req.body


    const newMovieTicket = new MovieTicket({
        showTime,showDate,movieId,movieShowId,userId,seats,payment,totalPrice,paymentType
    })
    
    res.json({success:true,message:"payment successfully completed"})
    await newMovieTicket.save()

} catch (error) {
     console.log(error)
    res.status(error.status || 500).json({message:error || "internal server error"})
       
}


} 