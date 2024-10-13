import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function BookedMovies() {
  const [movies, setMovies] = useState([]);
  const [display,setDisplay] =useState(false)
  const navigate = useNavigate();



  const bookedMovies = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/booked-movies",
        method: "GET",
      });

      setMovies(response.data.data.movieBooked);
    } catch (error) {
      console.log(error);
    }
  };

  const bookedMovieDelete = async (id,seat,theaterId,seatType) => {
    try {
      
      await axiosInstance({
        url: `/user/booked-delete/${id}/${theaterId}`,
        method: "PUT",
        data:{seatsNumber:seat,seatType:seatType}
      });
      bookedMovies();
    } catch (error) {
      console.log(error);
    }
  };


 setTimeout(()=>{
  setDisplay(true)
 },2000)

  useEffect(() => {
    bookedMovies();
  }, []);

  return (
    <>
      <button
        className="mt-8 ml-8 text-[20px] "
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>

      <div className=" px-3 md:px-14 md:container flex gap-3 flex-wrap  justify-center md:mx-auto mb-10 mt-6 lg:max-w-[970px]">
        {movies.length > 0 ? (
           movies.map((item, index) => (
            <div key={item._id} className="min-w-[300px] md:min-w-[251px]   p-2 shadow-lg cursor-default">
              <div className="p-2  rounded-t-lg ">
               
                  <div className="font-semibold"> {item.movieId.title} </div>
                 
               
                <div className="font-semibold"> {item.movieId.language} </div>
              </div>
              <img
                className="max-h-48 w-full"
                src={item.movieId.image}
                alt={item.movieId.title}
              />
              <div className="p-2">
                <div className="w-[240px]">
                  <div className="m-1 text-xs  font-semibold">{`Theater name : ${item.theaterId.screenName}`}</div>
                  <div className="m-1 text-xs  font-semibold">{`Screen type : ${item.theaterId.screenType}`}</div>  
                  <div className="m-1 text-xs  font-semibold">{`Seat No : ${item.movieSeat.join(" , ")}`}</div>
                  <div className="m-1 text-xs  font-semibold">{`Movie Time: ${item.movieTime}`}</div>
                  <div className="m-1 text-xs font-semibold">{`Date : ${item.date}`}</div>
                  <div className="m-1 text-xs font-semibold ">{`Seat Type : ${item.theaterSeatType[0]}`}</div>
                </div>
                <div>
                  <div className="flex justify-end text-xs font-semibold">
                    Price
                  </div>
                  <div className="text-end font-semibold text-xs mb-5">
                    {" "}
                    {`₹${item.moviePayment}`}{" "}
                  </div>
                  <div className="text-center border border-bg-primary">
                    {item.bookedId}
                  </div>
                  <button className="cursor-pointer p-1 mt-3 w-full bg-blue-500 text-white rounded-md" onClick={() => bookedMovieDelete(item._id,item.movieSeat,item.theaterId._id,item.theaterSeatType[0])} >

                    Cancel 
                  </button>
                </div>
              </div>
            </div>
          ))
         
        ) : (
        display ? <h2 className="text-red-500 font-semibold">No Movie Booked</h2> : ""
        )}
      </div>
    </>
  );
}

export default BookedMovies;
