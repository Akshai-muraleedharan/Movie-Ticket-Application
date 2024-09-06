
import image from '../../assets/image/payment.png'
import {  useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function PaymentSuccessPage() {
  const time = useSelector((state) => state.payment.value)
  const payment = useSelector((state) => state.payment.payment)
  const selectedSeat = useSelector((state) => state.payment.seat)

  console.log(selectedSeat,'seats')
  console.log(payment,"total amount");
  console.log(time);


const {movie} = useParams()
const {theater} = useParams()
 
console.log(movie,"movie id")
console.log(theater,"theater id")


 const paymentGet = async () => {
  try {
    const response = await axiosInstance({
      url:`/user/book-seat/${theater}`,
      method:"PUT",
      data:{seatNumber:selectedSeat}
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
 }

 const paymentSuccess = async () => {
  try {
    const response = await axiosInstance({
          url:`/user/payment-movie/movie/${movie}/theater/${theater}`,
          method:"POST",
          data:{
            moviePayment:payment,
            movieTime:time,
            movieSeat:selectedSeat
          }
    })
      console.log(response)

  } catch (error) {
    console.log(error)
  }
 } 

useEffect(()=>{
  paymentSuccess()
  paymentGet()
})

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