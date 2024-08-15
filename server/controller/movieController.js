import NewMovieModel from '../models/newMovieModel.js'

export const movieCreate = async (req,res,next) => {
    try {

       
        
        const {title,desc,image,rating,duration,genure} =req.body

        const movieExist =await NewMovieModel.findOne({title})

        if(movieExist){
          
           return res.status(400).json({success:false,message:"movie already exist"})
        }

        const newMovie = new NewMovieModel({
            title,desc,image,rating,duration,genure
        })

        await newMovie.save()
        
        res.status(200).json({success:true,message:" movie create successfully"})
        
    } catch (error) {
        console.log(error);
        
    }
} 

export const movieList = async (req,res) => {
  try {
    const allMovie = await NewMovieModel.find()
  
    const moviesLength = allMovie.length;
   if(moviesLength <= 0){
       return res.status(400).json({success:false,message:"no movies",movieLenth:moviesLength})
   }
   res.json({status:true,movies:allMovie,movieLenth:moviesLength})

  } catch (error) {
    console.log(error);
    
  }
}

export const movieUpdate = async (req,res) => { 
   try {
   
    
    const {title,desc,image,rating,duration,genure} = req.body;

    const {id} = req.params

    const movieExist =await NewMovieModel.findOne({title})

    if(movieExist){
      
       return res.status(400).json({success:false,message:"movie already exist"})
    }


    const updatedMovie = await NewMovieModel.findByIdAndUpdate(id,{
        title,
        desc,
        image,
        rating,
        duration,
        genure
    },{new:true})

    res.json({success:true,message:"movie updated", updatedMovie})
   } catch (error) {
    console.log(error);
    
   }
}

export const movieDelete = async (req,res) => {

    const {id} = req.params

    

    await NewMovieModel.findByIdAndDelete(id)

    res.json({success:true,message:"deleted successfully"}) 
}  