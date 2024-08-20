import TheaterModel from "../models/theaterModel.js"



export const theaterCreate = async (req,res) => {

    try {
               
        const {screenName,city,screenType,seats} =req.body;

    const newTheater =new TheaterModel({
        screenName,city,screenType,seats,movieSchedules:[]
    })

    await newTheater.save()

    res.json({success:true,message:"theater added successfully"})
    
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
} 


export const theaterMovieShedule = async (req,res) => {
    try {
        const {id} = req.params
        const {movieId} =req.body
        const movie = await TheaterModel.findById(id)

        movie.movieSchedules.push({
            movieId,
             
        })

        await movie.save()
     res.json({success:true,message:"data added successfully",data:movie})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}

export const theaterList = async (req,res) => {

    try {
 const allTheaterList = await TheaterModel.find()
     const theaterListLength = allTheaterList.length
 if(!allTheaterList){
    return res.status(400).json({success:false,message:"no movie found"})
 }
 res.status(200).json({success:true,message:"theater-list",allTheaterList,length:theaterListLength})
    } catch (error) {
        
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
} 


export const theaterUpdate = async (req,res) => {
    
    try {
        const {id} =req.params

        const theaterExist = await TheaterModel.findById(id)

        if(!theaterExist){
            
          return res.status(400).json({success:false,message:"Theater not found"})
          
        }

        const {screenName,city,screenType,seats} =req.body
        const theaterDetail =await TheaterModel.findByIdAndUpdate(id,{
            screenName,
            city,
            screenType, 
            seats
        },{new:true})

        res.json({success:true,message:theaterDetail})
    } catch (error) {
       
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}

export const theaterDelete = async (req,res) => {
    
    try {
        console.log('hitted');
        
        const {id} =req.params

        const deleteTheater = await TheaterModel.findByIdAndDelete(id)

        res.status(200).json({success:true,message:"deleted successfully",deleteTheater})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}

export const theaterSingle = async (req,res) => {

    try {
        
        const {id} =req.params

        const singleData = await TheaterModel.findById(id).populate({path:'movieSchedules.movieId', model:'movies'})

        res.json({success:true,message:"single data",singleData})
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}