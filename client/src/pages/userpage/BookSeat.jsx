import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";


function BookSeat() {
const[ Theater,setFetchTheater] = useState([])
const[ TheaterSeat,setTheaterSeat] = useState([])

const {id} = useParams()
const {movieId} = useParams()
const navigate = useNavigate()

const fetchTheater = async () => {
    try {
        const response = await axiosInstance({
            url:`theater/user-theater/${id}`,
            method:"GET"
        })
        setFetchTheater(response.data.data)
        setTheaterSeat(response.data.data.seats)
        
    } catch (error) {
        console.log(error)
    }
}

const paymentSeat = [];


const handleClick = (amt,seat) => {
  

   paymentSeat.push(seat)
   console.log(paymentSeat)
   
  
}

 


useEffect(()=> {
    fetchTheater()
},[])


  return (
   <>
   <div>
   <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
  
    <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
        <div className='flex justify-between shadow-lg p-2 rounded-md text-lg font-semibold' >
            <p>{Theater.screenName}</p>
            <p>{Theater.screenType}</p>
            <p>{Theater.city}</p>
        </div>
   </div>
<div className='flex justify-center flex-col items-center'>
   <div className='flex flex-wrap justify-evenly gap-2 md:gap-5 w-4/5 overflow-x-visible  md:max-w-[700px]'>
    {TheaterSeat.map((item,index)=> (
        
       <div key={item.seatEndNumber} className=  "non_activeColor" onClick={()=> handleClick(item.seatPayment,item.seatEndNumber)}>{item.seatEndNumber}</div>
    ))}
   </div>

        <div className='mt-12 w-[60%] bg-sky-300 h-5'></div>
   </div>
   </div>
   </>
  )
}

export default BookSeat