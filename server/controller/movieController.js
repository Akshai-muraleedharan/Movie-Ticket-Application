import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import NewMovieModel from "../models/newMovieModel.js";

export const movieCreate = async (req, res, next) => {
  try {
    const { title,  duration, genres,language } = req.body;
  
    if(!title ||  !duration || !genres || !language){
      return res.status(400).json({success:false,message:"All fields required"})
    }
    const movieExist = await NewMovieModel.findOne({ title });

    if (!req.file) {
      return res 
        .status(400)
        .json({ success: false, message: "please add movie image" });
    }

    const uploadResult = await cloudinaryInstance.uploader
      .upload(req.file.path, { folder: "movie ticket application/movies" })
      .catch((error) => {
        console.log(error);
      });


      if(!uploadResult) return res.status(400).json({success:true,message:"image required"})

    if (movieExist) {
      return res
        .status(400)
        .json({ success: false, message: "movie already exist" });
    }

    const timeShedule = ["12:00pm", "03:00pm", "06:00:pm", "12:00pm"];

    const newMovie = new NewMovieModel({
      title,
      desc,
      image: uploadResult.url,
      duration,
      genres,
      showTime: timeShedule,
      language
    });

    await newMovie.save();

    res
      .status(200)
      .json({ success: true, message: " movie create successfully",data:newMovie });
  } catch (error) {
    console.log(error);
  }
};


export const singleMovie = async (req,res) => {
  try {
   
    const {id} =req.params
  console.log(id)
    if(!id) return res.status(400).json({success:false,message:"id not found"})
    const fetchSingleMovie = await NewMovieModel.findById(id)
    
    res.json({success:true,message:"data-fetched",data:fetchSingleMovie})
  } catch (error) {
    console.log(error)
  }
}

export const movieList = async (req, res) => {
  try {
    const allMovie = await NewMovieModel.find();

    const moviesLength = allMovie.length;
    if (moviesLength <= 0) {
      return res.status(400).json({
        success: false,
        message: "no movies",
        movieLenth: moviesLength,
      });
    }
    res.json({ status: true, movies: allMovie, movieLenth: moviesLength });
  } catch (error) {
    console.log(error);
  }
};

export const movieUpdate = async (req, res) => {
  try {
    const { title, desc, image, rating, duration, genres } = req.body;

    const { id } = req.params;

    const timeShedule = ["12:00pm", "03:00pm", "07:00:pm", "1:00pm"];

    const updatedMovie = await NewMovieModel.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        image,
        rating,
        duration,
        genres,
        showTime: timeShedule,
      },
      { new: true }
    );

    res.json({ success: true, message: "movie updated", updatedMovie });
  } catch (error) {
    console.log(error);
  }
};

export const movieDelete = async (req, res) => {
  const { id } = req.params;

  await NewMovieModel.findByIdAndDelete(id);

  res.json({ success: true, message: "movie deleted successfully" });
};
