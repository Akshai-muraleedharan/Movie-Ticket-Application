import TheaterModel from "../models/theaterModel.js"



export const theaterCreate = async (req,res) => {

    try {
               
        const {screenName,city,screenType,seats,movieSchedules} =req.body;

    const newTheater =new TheaterModel({
        screenName,city,screenType,seats,movieSchedules:[]
    })

    await newTheater.save()

    res.json({success:true,message:"theater added successfully"})
    
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
} 

