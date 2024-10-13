import React from 'react'
import { Link } from 'react-router-dom';

function PopModel({closePopModel,movieId,platinumAmt,goldAmt}) {

 
  return (
   <>
   <div className='flex justify-center items-center  md:h-[50vh] '>
    <div className='w-72 p-6 bg-white rounded-md h-64 md:h-64 shadow-2xl'>
        <h1 className='text-center text-black font-semibold text-2xl mb-5'>Select Seat Type</h1> 
    <div className=' flex flex-col justify-start gap-3'>
          
    <button onClick={()=>closePopModel("Platinum")} className='p-2 bg-[#c214d7] hover:bg-[#b36abb] text-white rounded-md'>{`Platinum Rs : ${platinumAmt === undefined ? "" : platinumAmt.seatPayment}`}</button>
    <button onClick={()=>closePopModel("Gold")} className='p-2 bg-[#c214d7] hover:bg-[#b36abb] text-white rounded-md'>{`Gold Rs : ${platinumAmt === undefined ? "" : goldAmt.seatPayment}`}</button>
    </div>
    <div className='flex justify-end'>
    <Link to={`/user/single-page/${movieId}`}> 
        <button  className='p-2 text-black bg-gray-200 font-semibold hover:bg-gray-400 mt-5 rounded'> Close</button>
        </Link>
    </div>
    </div>
   </div>
   </>
  )
}

export default PopModel