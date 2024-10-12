import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FilePenLine, X } from "lucide-react";
import { CircleArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import {  useDispatch } from 'react-redux'
import {movieTime,movieName} from '../../Redux/Slice/showTimeSlice'

function MovieSinglePage() {

  const [fetchs, setFetch] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [rating, setRating] = useState([]);
  const [theaterDeatil, setTheaterDetail] = useState([]);
  const [review, setReview] = useState(true);
  const [userEmailCheck,setuserEmailCheck] = useState(false)
  const [userCheck,setUserCheck] =useState([])
  const [selectedValue, setSelectedValue] = useState(null);
  const [errors,setErrors] = useState("")
  const { register, handleSubmit} = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  

 let times =  showTime.map((item) => item.timeShedule)
 
  useEffect(() => {
    let userReview = rating.find((item) => item.usermail === userCheck);
  
    if (userReview) {
      setuserEmailCheck(true);
    } else {
      setuserEmailCheck(false);
    }
  }, [rating, userCheck]);




  const fetchSingleDetail = async () => {
    try {
      const response = await axiosInstance({
        url: `movie/single-movie/${id}`,
        method: "GET",
      });

      setFetch(response.data.data);
      setShowTime(response.data.data.showTime);
      setTheaterDetail(response.data.data.theaterId);
      dispatch(movieName(response?.data?.data?.title))
    } catch (error) {
      console.log(error);
    }
  };

  const clickTime = (value) => {
    setSelectedValue(value);
   
    
  };
  
 

  const fetchReview = async () => {
    try {
      const response = await axiosInstance({
        url: `/rating/user/${id}`,
        method: "GET",
      });
      setRating(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const reviewUpdate = () => {
    setReview(false);
  };

  const reviewPost = async (data) => {
      try {
       await axiosInstance({
          url:`/rating/movie/${id}`,
          method:"POST",
          data
        })
        fetchReview()
        
      } catch (error) {
        console.log(error)
      }
  };

  const usermail = async () => {
       try {
       const response = await axiosInstance({
        url:"user/profile",
        method:"GET"
       }) 

       setUserCheck(response?.data?.data?.email)
       } catch (error) {
        console.log(error)
       }
    
  }

  const editReview = async (data) => {
  
    let getId = rating.find((item) => item.usermail === userCheck)
   
    try {
    const response =  await axiosInstance({
      url:`/rating/review/${getId._id}`,
         method:"PUT",
         data:data
       })
       fetchReview()
       setErrors(response.data)
       setTimeout(()=> {
        setErrors("")
       },2000)
     } catch (error) {
      setErrors(error.response.data)
       console.log(error)
       setTimeout(()=> {
        setErrors("")
       },2000)
       
     
     }
    
  }

 


  const deleteReview = async (id) => {
    try {
      await axiosInstance({
          url:`/rating/comment/${id}`,
          method:"DELETE" 
      })
      fetchReview()
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchSingleDetail();
    fetchReview();
    usermail()  
  }, [review]);

 
 

  return (
    <>
      <div>
        <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 cursor-default lg:max-w-[800px]">
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
             
              <div className="w-full flex mt-5 justify-around gap-3 flex-wrap ">
              


{times.map((item, itemIndex) =>
    item.map((val, index) => (
      <div
        key={`${itemIndex}-${index}`} 
        className={selectedValue === val ? "timeSelect" : "timeselected"}
        onClick={() => clickTime(val)}
      >
       
        {val}
      </div>
    ))
  )}

              </div>
             
              <Link to={`/user/movie/${id}/book-seat/${theaterDeatil._id}`}>
               <button disabled={selectedValue === null }  onClick={()=> dispatch(movieTime(selectedValue))}  className="py-1 bg-[#c214d7]  text-white rounded-sm w-full mt-4 " >
                  {selectedValue === null ? "Please select Time" : "book now"}
             </button>
              </Link>
            
            </div>
          </div>

          {/* review card */}

          <div className="mt-4 p-5 shadow-xl">
            <div className="flex justify-between">
              <h3 className="font-semibold">Review</h3>
              <span onClick={reviewUpdate}>
                <FilePenLine />
              </span>
            </div>



{rating.map((item) => (

          

          
              <div key={item._id} className="bg-slate-100 p-2 mt-2">
               
                  <h4>
                    {item.username == null ? "user" : item.username.username}
                  </h4>

                
                  
                  <div className="flex justify-between items-center">
               <p className="text-[14px] mt-2">{item.comment}</p>
               <div className="flex gap-2">
               {userCheck === item.usermail ?  <button className="btn p-0 h-0 min-h-0 bg-transparent border-0 mt-[11px] font-semibold text-[13px] text-blue-500" onClick={()=>document.getElementById('my_modal_3').showModal()}>edit</button>  : ""} 
                 {userCheck === item.usermail ?  <span className=" mt-2 cursor-pointer text-red-500 font-semibold text-[13px]"  onClick={()=> deleteReview(item._id)}> delete</span>  : ""} 
               
                  </div>
                  </div>
              </div>
           
))}

            {
        <>    

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
    
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg mb-3">edit review!</h3>
    <input type="text"  {...register("comment")} placeholder="Type here" className="input input-bordered input-success w-full " />

    <div className="flex justify-between mt-3">
     <div>{errors.success === false ? <p className="text-red-500 text-xs">{errors.message}</p> : <p className="text-green-500 text-xs">{errors.message}</p> }</div>
    <button className="btn  bg-blue-500 text-white" onClick={handleSubmit(editReview)}>update</button>
    </div>
   
  </div>
</dialog>
</> 
            }

            {userEmailCheck ? "" :  review === false ? (
             <div className="flex items-center w-full relative">
               <label className="input input-bordered w-full  justify-between flex items-center gap-2 mt-2">
                <input
                  type="text"
                  {...register("comment")}
                  className="grow"
                  placeholder="Review"
                />
               
              </label>
              <span className="mr-2 absolute right-0 cursor-pointer" onClick={handleSubmit(reviewPost)}>
                  <CircleArrowRight />
                </span>
             </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieSinglePage




 
