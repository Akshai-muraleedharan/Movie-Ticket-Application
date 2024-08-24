import mongoose from 'mongoose' 
const movieTicketSchema = new mongoose.Schema({
   
    movieId:{
        type:mongoose.Types.ObjectId,
        ref:"movies"
    },
    theaterId:{
        type:mongoose.Types.ObjectId,
        ref:"theater"
    },
    userId:{
        type:mongoose.Types.ObjectId, 
        ref:"users"
    },
    showTime: {
        type: String, 
        required: true 
    },
           
    showDate: {
        type: String, 
        required: true 
    },
    seats:[],
    totalPrice:{  type:String, required:true
    },
    paymentType:{  type:String, required:true
    } 
})
const MovieTicket = mongoose.model('movieTicket',movieTicketSchema)

export default MovieTicket;