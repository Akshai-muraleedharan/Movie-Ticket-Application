import MovieTicket from "../models/movieTicketModel.js"
import NewMovieModel from "../models/newMovieModel.js"
import TheaterModel from "../models/theaterModel.js"
import UserModel from '../models/userModel.js'
import Stripe from "stripe";

const client_domain = process.env.CLIENT_DOMAIN

// export const movieTicket = async (req,res) => {

// try {
   
//     const {seatArry,payment,totalPrice,paymentType,showTime,showDate} = req.body
//     // const {user} =req.params
//     const  verifiedUser  = req.user.email;
//     const {movie} =req.params
//     const {theater} =req.params
    
//     if( !movie || !theater){
//         return res.status(400).json({success:false,message:'user not valid'})
//     }
  
//     const secureUser = await UserModel.findOne({email:verifiedUser})

//     const user = secureUser._id
    

//     // if(!seatArry){
//     //     return res.status(400).json({success:false,message:"seats not selected"})
//     // }

//     const newMovieTicket = new MovieTicket({
        
//         movieId:movie,
//         theaterId:theater,
//          userId:user,
//         seats:seatArry,
//         payment,
//         totalPrice, 
//         paymentType,
//         showTime,
//         showDate
//     })
//     await newMovieTicket.save() 

//     secureUser.movieBooked.push(newMovieTicket)

//     await secureUser.save()

//     res.json({success:true,message:"payment successfully completed",data:newMovieTicket})
  

// } catch (error) {
//      console.log(error)
//     res.status(error.status || 500).json({message:error || "internal server error"})
       
// }


// } 

const stripe = new Stripe(process.env.Stripe_Private_Api_Key);

export const movieTicket = async(req,res) => {
    try {
        const {movie} =req.params;
        const {theater} = req.params;
        const {seatArry} =req.body;

        console.log(seatArry)
        if(!movie){
            return res.status(400).json({success:false,message:"movie id not get"})
        }

        if(!theater){
            return res.status(400).json({success:false,message:"theater id not get"})
        }

       
        const findMovie = await NewMovieModel.findById(movie);
        const movieName =  findMovie.title

        const findTheater = await TheaterModel.findById(theater);

        const TheaterName = findTheater.screenName;
        const TheaterCity = findTheater.city;
        const TheaterscreenType = findTheater.screenType;


        // const lineItems = seatArry.map((product) => ({
        //     price_data: {
        //         currency: "inr",
        //         product_data: {
        //             name: "hello",
                    
        //         },
        //         unit_amount: Math.round(product.seatPayment * 100),
        //     },
        //     quantity: product.seatEndNumber,
        // }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: seatArry.map(seat => ({
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: `Seat ${seat.seatEndNumber} - ${movieName} at ${TheaterName}`,
                    description: `Theater: ${TheaterName}, City: ${TheaterCity}, Screen Type: ${TheaterscreenType}`,
                  },
                  unit_amount: seat.seatPayment * 100, // amount in cents
                },
                quantity: 1,
              })),
           
            mode: "payment",
            success_url: `http://localhost:4005/api/v1/user/movie/${encodeURIComponent(movie)}/theater/${encodeURIComponent(theater)}/success`,
            cancel_url: `http://localhost:4005/api/v1/user/cancel`,
        });

        console.log('sessionId====',session.id);
        

        res.json({ success: true, sessionId: session.id });

    } catch (error) {
        console.log(error)
    }
}


export const ticketTest = async (req,res) => {
    try {
       const {user} = req.params
       const {theater} =req.params
       console.log(user)
       console.log(theater,'theater')
       
    } catch (error) {
        console.log(error)
    }
}


export const totalPaymentList = async (req,res) => {
    try {
        const ticketList = await MovieTicket.find()

        if(!ticketList){
            return res.status(400).json({success:false,message:"no payments"})
        }else{
            res.json({success:true,message:ticketList})
        }
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}