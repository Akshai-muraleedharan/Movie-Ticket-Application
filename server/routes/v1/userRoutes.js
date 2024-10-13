import express from "express";
import {  bookedMovieDelete, bookedMovies, checkUser, SeatBooking, userBookedDelete, userDelete, userLogin, userLogout, userMovies, userProfile, userSignup, userUpdate,} from "../../controller/userController.js";
import { authUser } from "../../middleware/authUser.js";
import { upload } from "../../middleware/imageUploadMiddleware.js";
import {  errorSignupHandler, loginErrorHandler } from "../../middleware/error.js";


const Router = express.Router();

// user signup and login

Router.post("/signup",errorSignupHandler, userSignup);
Router.post("/login",loginErrorHandler, userLogin);
Router.put('/book-seat/:theaterId',SeatBooking)
Router.delete("/delete", authUser, userDelete);
Router.put("/update/", authUser, upload.single("profile"), userUpdate);
Router.post("/logout", userLogout);
Router.get("/check-user", authUser, checkUser); 
Router.get("/profile", authUser, userProfile);
Router.post("/payment-movie/movie/:movieId/theater/:theaterId", authUser, userMovies);
Router.get("/booked-movies", authUser, bookedMovies);
Router.put("/booked-delete/:CardId/:theaterId", authUser, userBookedDelete);

export default Router;
 