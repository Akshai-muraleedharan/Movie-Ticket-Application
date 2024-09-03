import React, { useEffect } from 'react'
import image from '../../assets/image/payment.png'
import { useNavigate } from 'react-router-dom'
function PaymentSuccessPage() {

 const navigate = useNavigate()

 useEffect(()=> {
  setTimeout(() => {
   navigate('/user/movies')
  }, 4000);
 },[]) 


  return (
   <>
   <div className='flex justify-center items-center h-[90vh]'>

   <div className="card bg-base-100 static h-[100%]  md:h-[50%] w-96 mt-5 mb-5 md:shadow-xl">

  <div className="card-body ">
   <div className='flex justify-center'>
    <img src={image} className='w-[100px] h-[100px]' alt="payment" />
   </div>

   <h1 className='text-center font-semibold text-1xl text-green-400'>Payment successfully completed</h1>

   
  </div>
</div>

   </div>
   </>
  )
}

export default PaymentSuccessPage