import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is requird"],
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    userDeleted: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    movieBooked: [
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
        bookedId: {
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
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
