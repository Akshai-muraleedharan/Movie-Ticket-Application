import mongoose from 'mongoose';


 
    const movieShowSchema = new mongoose.Schema({
        screenName:{
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
        movieSchedules:[{
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movies', // Reference to the Movie model
              
            },
            showTime: String,
           
            showDate: String
        }]
    })

    const TheaterModel = mongoose.model('theater',movieShowSchema);

    export default TheaterModel