import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePageClient() {
 const [fetchTheater,setFetch] = useState("");
 const [shedules,setShedules] = useState([]);

const fetchId =fetchTheater ? fetchTheater._id : null
 
const fetchSingleTheater = async () => {
  try {
    const response = await axiosInstance({
      url:"theater/single-theater",
      method:"GET"
    })
    
    setFetch(response.data.data)
    setShedules(response.data.data.movieSchedules)
  } catch (error) {
    console.log(error)
  }
}

const sheduleDelete = async (cardId)=> {
 
  try {
  
    const response = await axiosInstance({
        url:`theater/delete-shedule/theaterId/${fetchId}/sheduleId/${cardId}`,
        method:"PUT"
      })
      fetchSingleTheater()

      console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const theaterDelete =async (id) => {
  try {
    await axiosInstance({
      url:`theater/delete-theater/${id}`,
      method:"DELETE"
    })
    fetchSingleTheater()
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=> {
  fetchSingleTheater()
},[])


  return (
    <>
    <div className='w-full flex justify-center flex-col items-center'>
    <div className='container  rounded-md shadow-xl  p-5 mt-5'> 
      <div>
        <h2 className='text-center text-2xl font-semibold'>My theater</h2>

       {fetchTheater ?  <div>
      <div className='flex justify-end cursor-pointer' onClick={()=> theaterDelete(fetchTheater._id)}>  <X /></div>
        <h4 className='mt-5 tracking-wide'>Theater Name : <span className='font-semibold capitalize'>{fetchTheater.screenName}</span></h4>
        <h4 className='mt-5 tracking-wide'>ScreenType : <span className='font-semibold capitalize'>{fetchTheater.screenType}</span></h4>
        <h4 className='mt-5 tracking-wide'>City : <span className='font-semibold capitalize'>{fetchTheater.city}</span></h4>
        <div className='flex justify-end gap-2'>
    <Link to={'create-movie'} > <button className='py-1 px-3 bg-green-600 rounded-sm text-white font-semibold' >Create movies</button></Link>
    <Link > <button className='py-1 px-3 bg-green-600 rounded-sm text-white font-semibold' >Shedule Movie</button></Link>
        </div>
        </div> : <p className='text-center mt-6 text-red-500'>please resgister theater</p>}
      </div>
      
    </div>


{/* movie shedules */}
    <div className='container rounded-md shadow-xl p-5 mt-5 mb-5'>
           <h2 className='text-center font-semibold text-2xl'>Scheduled movie</h2>

           <div className='w-full flex flex-wrap'>
                
              {shedules.length > 0 ? shedules.map((item) => (
                   <div key={item._id} className='mt-5 p-2 rounded-md shadow-md flex flex-col flex-wrap w-full md:w-4/12'>
                    <div className='flex justify-end' onClick={()=> sheduleDelete(item._id)}> <X /></div>
                     <div className=' flex justify-center'>
                     <img className='h-44 w-36' src={item.movieId.image} alt={item.movieId.title} />
                     </div>
                      <div className='mt-5'>
                        <h2>Titile : {item.movieId.title}</h2>
                        <h3 className='text-sm'>Show-time</h3>
                        <h2 className='text-xs text-red-400'>{item.movieId.showTime.join(' , ')}</h2>
                      </div>
                   </div>
               
              )) : <p className='text-red-500 w-full text-center mt-5'> No movies found</p>}  

           </div>
    </div>
    </div>
    </>
  )
}

export default HomePageClient