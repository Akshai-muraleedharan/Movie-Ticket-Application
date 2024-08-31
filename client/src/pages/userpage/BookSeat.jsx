import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useParams } from 'react-router-dom'

function BookSeat() {
const[ Theater,setFetchTheater] = useState([])
const[ TheaterSeat,setTheaterSeat] = useState([])
const {id} = useParams()
  
console.log(TheaterSeat)
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
    const numbers = parseInt(amt)
    paymentSeat.push(seat)
    const filteredNumbers = paymentSeat.filter(num => num == seat);
   
 
    console.log( filteredNumbers)
}

 


useEffect(()=> {
    fetchTheater()
},[])


  return (
   <>
    <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
        <div className='flex justify-between shadow-lg p-2 rounded-md text-lg font-semibold' >
            <p>{Theater.screenName}</p>
            <p>{Theater.screenType}</p>
            <p>{Theater.city}</p>
        </div>
   </div>
<div className='flex justify-center flex-col items-center'>
   <div className='flex flex-wrap justify-evenly gap-5 w-4/5 overflow-x-visible  md:max-w-[700px]'>
    {TheaterSeat.map((item,index)=> (
        
       <div key={item.seatEndNumber} className='w-6 h-6 hover:bg-green-600 rounded-sm border-[1px] border-green-600 text-[10px] text-center cursor-pointer' onClick={()=> handleClick(item.seatPayment,item.seatEndNumber)}>{item.seatEndNumber}</div>
    ))}
   </div>

        <div className='mt-12 w-[60%] bg-sky-300 h-5'></div>
   </div>
   </>
  )
}

export default BookSeat