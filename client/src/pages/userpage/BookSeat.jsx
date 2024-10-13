import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { loadStripe } from "@stripe/stripe-js";
import {  useDispatch, useSelector } from 'react-redux'
import {moviePayment, seatNumber,seatType} from '../../Redux/Slice/showTimeSlice'
import PopModel from '../../components/user/PopModel';
function BookSeat() {



  const [Theater, setFetchTheater] = useState({});
  const [TheaterSeat, setTheaterSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const [userSelectSeat,setuserSelectSea] = useState("")
  const dispatch = useDispatch()
  const { id } = useParams();
  const { movieId } = useParams(); 
  const navigate = useNavigate();


  const fetchTheater = async () => {
    try {
     
      const response = await axiosInstance({
        url: `theater/user-theater/${id}`,
        method: 'GET'
      });
      setFetchTheater(response.data.data);
      setTheaterSeat(response.data.data.seats);
     
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const handleClick = (index) => {
    setTheaterSeat(prevSeats => {
      const newSeats = [...prevSeats];
      const seat = newSeats[index];

      if (!seat.availableSeat) return prevSeats; 

      
      seat.selected = !seat.selected;

      if (seat.selected) {
        setSelectedSeats(prev => [...prev, seat]);
      } else {
        setSelectedSeats(prev => prev.filter(s => s.seatEndNumber !== seat.seatEndNumber));
      }

      return newSeats;
    });
  };

  const totalPayment = selectedSeats.reduce((total, seat) => total + parseFloat(seat.seatPayment), 0);
  const seatNumbers  = selectedSeats.map(item => item.seatEndNumber)
   const selectedseatType = selectedSeats.map(item => item.SeatType)
    const platinumAmt = TheaterSeat.find((item) => item.SeatType === "Platinum")
    const goldAmt = TheaterSeat.find((item) => item.SeatType === "Gold")

 const paymentAmount = () => {
  return dispatch(moviePayment(totalPayment))
 }

 const seatNumbres = () => {
  return dispatch(seatNumber(seatNumbers))
 }

 const seatTypes = () => {
  return dispatch(seatType(selectedseatType))
 }
 


  const seatBook = async() => {
    try {

      paymentAmount()
      seatNumbres()
      seatTypes()

       const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_MY);
       setLoading(true)
   const response = await axiosInstance({
            url:`/movie-ticket/movie/${movieId}/theater/${id}`,
            method:"POST",
            data:{seatArry:selectedSeats}
        })
       

        const sessionId = response?.data?.sessionId;
        
         stripe.redirectToCheckout({
            sessionId: sessionId,

        });
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  }

  const closePopModel = (seatType) => {
    setIsOpen(false)
    setuserSelectSea(seatType)
  }

  useEffect(() => {
    fetchTheater();
    setIsOpen(true)
   
  }, [id]); 



  return (
    <>
     {isOpen ? <PopModel closePopModel={closePopModel} movieId={movieId} platinumAmt={platinumAmt} goldAmt={goldAmt}/> : <div>
        <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="px-3 md:px-14 cursor-default md:container md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
          <div className='flex justify-between shadow-lg p-2 rounded-md text-lg font-semibold'>
            <p>{Theater.screenName}</p>
            <p>{Theater.screenType}</p>
            <p>{Theater.city}</p>
          </div>
        </div>
        
        <div className='flex justify-center flex-col items-center'>

       <div className='flex justify-center flex-col items-center'>
       <h1 className={userSelectSeat === "Platinum" ? 'md:w-full ml-9 mb-2 font-semibold text-green-500' : 'md:w-full ml-9 mb-2 font-semibold'}>Platinum </h1>
          <div className='flex flex-wrap justify-evenly gap-2 md:gap-2 w-4/5 md:max-w-[750px] mb-5'>
            {TheaterSeat.map((seat, index) => (
             seat.SeatType ==="Platinum" ? <div
                key={seat.seatEndNumber}
                className={`seat ${ seat.availableSeat ? (seat.selected ? 'selected' : 'available') : 'booked' }`}
                onClick={userSelectSeat === "Platinum" ? seat.availableSeat ? () => handleClick(index) : undefined : null}>
               
              </div> : ""
            ))}
          </div>
          <h1 className={userSelectSeat === "Gold" ? 'md:w-full ml-9 mb-2 font-semibold text-green-500' : 'md:w-full ml-9 mb-2 font-semibold'}>Gold</h1>
          <div className='flex flex-wrap justify-evenly gap-2 md:gap-2 w-4/5 md:max-w-[750px]'>
            {TheaterSeat.map((seat, index) => (
             seat.SeatType ==="Gold" ? <div
                key={seat.seatEndNumber}
                className={`seat ${seat.availableSeat ? (seat.selected ? 'selected' : 'available') : 'booked'}`}
                onClick={userSelectSeat === "Gold"  ? seat.availableSeat ? () => handleClick(index) : undefined : null}>
               
              </div> : ""
            ))}
          </div>
       </div>

          <div className='w-full md:w-[50%] h-7 flex justify-between items-center p-1 mt-4 mb-5'>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-green-500 rounded-sm'> </div>   Selected </span>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-500 rounded-sm'> </div>   Booked </span>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-300 rounded-sm border-[1px] border-green-500'> </div>  Available </span>
          </div>
          <div className='w-[40%] bg-sky-300 h-5 mb-9 text-xs text-center font-semibold text-blue-500'>Screen</div>
          <div className='h-12'>
            {totalPayment > 0 ? <button className='px-6 py-1 bg-[#c214d7] text-white rounded' onClick={seatBook}>{loading === true ? "Loading..." :  `Total payment : ${totalPayment.toFixed(2)}`} </button> : ''}
          </div>
        </div>


      </div> }
    </>
  );
}

export default BookSeat;
