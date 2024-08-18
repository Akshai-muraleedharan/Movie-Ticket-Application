import mongoose from 'mongoose' 
const movieTicketSchema = new mongoose.Schema({
    showTime:{
        type:String, required:true
    },
    showDate:{
        type:String,required:true
    },
    movieId:{
        type:mongoose.Types.ObjectId,ref:"movie"
    },
    movieShowId:{
        type:mongoose.Types.ObjectId,ref:"show"
    },
    userId:{
        type:mongoose.Types.ObjectId, ref:"users"
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