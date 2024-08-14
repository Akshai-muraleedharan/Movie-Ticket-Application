import mongoose from 'mongoose'


  const newMovieSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        genure:{
            type:String,
            required:true
        }
  })

  const NewMovieModel = mongoose.model('movie',newMovieSchema);

  export default NewMovieModel