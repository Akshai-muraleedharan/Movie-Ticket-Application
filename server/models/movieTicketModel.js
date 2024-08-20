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
    seats:[
      {  
        row: {
            type: String, required: true  
        },
        col: {
            type: String,  required: true
        },
        seat_id: {
            type: String, required: true 
        },
        price: {
            type: String, required: true 
        }
      } 
    ],
    totalPrice:{  type:String, required:true
    },
    paymentType:{  type:String, required:true
    } 
})
const MovieTicket = mongoose.model('movieTicket',movieTicketSchema)

export default MovieTicket;