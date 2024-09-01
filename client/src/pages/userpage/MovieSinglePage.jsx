import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function MovieSinglePage() {
  const [fetchs, setFetch] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [rating, setRating] = useState([])
  const [theaterDeatil,setTheaterDetail] = useState([])
  console.log(theaterDeatil)
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchSingleDetail = async () => {
    try {
      const response = await axiosInstance({
        url: `movie/single-movie/${id}`,
        method: "GET",
      });

      setFetch(response.data.data);
      setShowTime(response.data.data.showTime);
      setTheaterDetail(response.data.data.theaterId)
    } catch (error) {
      console.log(error);
    }
  };

  const clickTime = () => {
    console.log("hello");
  };

  const fetchReview = async () => {
    try {
      const response = await axiosInstance({
        url:`/rating/user/${id}`,
        method:"GET"
      })
      setRating(response.data.data)
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSingleDetail();
    fetchReview()
  }, []);

  return (
    <>
      <div>
        <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
        <div className="flex justify-between p-2 shadow-lg text-xs md:font-semibold md:text-base">
           <p>Theater : {theaterDeatil.screenName}</p>
           <p>ScreenType : {theaterDeatil.screenType}</p>
           <p>City : {theaterDeatil.city}</p>
        </div>
          <div className="grid  grid-cols-1 rounded-md md:grid-cols-2 p-5 shadow-xl">
            <div className="flex justify-center ">
              <div className="w-80 flex justify-center">
                <img
                  className="  max-h-[230px] rounded-md"
                  src={fetchs.image}
                  alt="poster"
                />
              </div>
            </div>
            <div className="p-5">
              {/* <h2 className='text-2xl '>Title:{fetchs.title}</h2> */}
              <p className="mt-3 text-xs">
                <span className="font-bold">Title</span>: {fetchs.title}
              </p>

              {/* <p className='mt-5'><span className='font-bold'>Desc</span>: Maharaja (transl. The Great King)[b] is a 2024 Indian Tamil-language action thriller film[7] directed by Nithilan Swaminathan...</p> */}

              <p className="mt-3 text-xs">
                <span className="font-bold">Language</span>: {fetchs.language}
              </p>
              <p className="mt-3 text-xs">
                <span className="font-bold">Duration</span>: {fetchs.duration}
              </p>
              <p className="mt-3 text-xs">
                <span className="font-bold">Genres</span>: {fetchs.genres}
              </p>

              <div className="w-full flex mt-5 justify-around gap-3 flex-wrap">
                {showTime.map((item, index) => (
                  <div
                    key={index}
                    className=" text-red-500 text-xs cursor-pointer"
                    onClick={clickTime}
                  >
                    {item}
                  </div>
                ))}
              </div>
             <Link to={`/user/book-seat/${theaterDeatil._id}`}><button className="py-1 bg-[#c214d7] text-white rounded-sm w-full mt-4">
                Book Now
              </button></Link> 
            </div>
          </div>

          {/* review card */}

          <div className="mt-4 p-5 shadow-xl">
            <h3 className="font-semibold">Review</h3>


          {rating.map((item)=> (
             <div key={item._id} className="bg-slate-100 p-2 mt-2">
             <div className="flex justify-between items-center">
               <h4>{ item.username == null ? "user"  : item.username.username   }</h4>

               {/* rating */}
               <div className="rating">
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-orange-400"
                 />
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-orange-400"
                   defaultChecked
                 />
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-orange-400"
                 />
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-orange-400"
                 />
                 <input
                   type="radio"
                   name="rating-2"
                   className="mask mask-star-2 bg-orange-400"
                 />
               </div>
             </div>
             <p className="text-[14px] mt-2">
              {item.comment}
             </p>
           </div>
          ))}
            
           
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieSinglePage;
