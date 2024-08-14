import mongoose from 'mongoose';



    const movieShowSchema = new mongoose.Schema({
        screenname:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        screenType:{
            type:String,
            required:true
        },
        seats:{
            type:Array,
            default:[]
        },
        movieSchedules:[
            {
                movieId:{
                    type:mongoose.Types.ObjectId,
                    ref:"movie",
                    required:true
                },
                showTime:String,
                notAvailableSeats: [{

                    row:String,
                    col:Number,
                    seat_id:String,
                    price:Number
                }],
                showDates:Date
            }
        ]
    })

    const ShowModel = mongoose.model('show',movieShowSchema);

    export default showModel