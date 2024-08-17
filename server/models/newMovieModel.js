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
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s",
        },
        rating:{
            type:Number,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        genure:{
            type:String,
            required:true
        }
  })

  const NewMovieModel = mongoose.model('movies',newMovieSchema);

  export default NewMovieModel