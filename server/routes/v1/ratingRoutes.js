import express from "express";
import { movieRatingCreate, movieRatingDelete, movieRatingGet, movieRatingUpdate } from "../../controller/ratingController.js";
import { authUser } from "../../middleware/authUser.js";

const Router = express.Router();

Router.post("/:movieId", authUser, movieRatingCreate);
Router.get("/user/:movieId", movieRatingGet);
Router.put("/:id", authUser, movieRatingUpdate);
Router.delete("/:id", authUser, movieRatingDelete);

export default Router;