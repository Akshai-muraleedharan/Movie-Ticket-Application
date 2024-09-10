import mongoose from 'mongoose';


 
    const movieShowSchema = new mongoose.Schema({
        screenName:{
            type:String,
            required:true
        },
        Ownermail:{
            type:String,
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
            type:[]
           
        },
        userPayment:{
            type:[
               {
                moviePayment: {
                    type: String, // Should be a string, e.g., '200'
                    required: true,
                  },
                  movieSeat: {
                    type: [Number],
                    required: true,
                  },
                  movieTime: {
                    type: String,
                    required: true,
                  },
                  userbookedId: {
                    type: String,
                  },
                  movieId: {
                    type: mongoose.Types.ObjectId,
                    ref: "movies",
                  },
                  date: {
                    type: String,
                  },
                  theaterId: {
                    type: mongoose.Types.ObjectId,
                    ref: "theater",
                  },
               }
            ]
        },
        movieSchedules:[{
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movies', // Reference to the Movie model
              
            },
            
        }]
    })

    const TheaterModel = mongoose.model('theater',movieShowSchema);

    export default TheaterModel