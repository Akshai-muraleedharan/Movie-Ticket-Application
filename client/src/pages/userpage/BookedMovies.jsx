import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { X } from "lucide-react";
function BookedMovies() {
const [movies,setMovies] = useState([])
const navigate = useNavigate()



  const bookedMovies =async () => {
    try {
      
      const response = await axiosInstance({
        url:"/user/booked-movies",
        method:"GET"
      })

      setMovies(response.data.data.movieBooked)
    } catch (error) {
      console.log(error)
    }
  }

  const bookedMovieDelete = async (id) => {
        try {
           await axiosInstance({
            url:`/user/booked-delete/${id}`,
            method:"PUT"
          })
          bookedMovies()
        } catch (error) {
          console.log(error)
        }
  }

    useEffect(()=>{
      bookedMovies()
    },[])


  return (
    <>
    

    <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
   
        <div className=" px-3 md:px-14 md:container flex gap-3 flex-wrap  justify-center md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
       
                    
                        {movies < 1 ? <h2 className="text-red-500 font-semibold">No Movie Booked</h2> : movies.map((item)=> (

                          <div className="card card-compact  w-full static shadow-xl bg-[#fff5e9]">
                        
                          <div className="card-body ">
                           <div className='flex justify-between'> 
                            <h2 className="card-title text-[16px]">{`Movie : ${item.movieId.title}`}</h2> 
                           <span onClick={()=> bookedMovieDelete(item._id)}> <X /></span>
                            </div>
                            <h2 className="card-title text-[16px]">{`Seat Numbers : ${item.movieSeat.join(', ')}`}</h2>
                            <h2 className="card-title text-[16px]">{`Theater : ${item.theaterId.screenName}`}</h2>
                            <h2 className="card-title text-[16px]">{`City : ${item.theaterId.city}`}</h2>
                            <h2 className="card-title text-[16px]">{`Screen : ${item.theaterId.screenType}`}</h2>
                            
                            <div className="card-actions justify-end">
                            <h2 className="card-title text-[16px]">{`Total amount : ₹ ${item.moviePayment}`}</h2>
                            </div>
                          </div>
                          </div>

                    ))}
                    
         

                    </div>

 
    </>
  )
}

export default BookedMovies