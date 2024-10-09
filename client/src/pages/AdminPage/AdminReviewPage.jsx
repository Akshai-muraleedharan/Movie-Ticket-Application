import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';


function AdminReviewPage() {

    const [movies, setmovies] = useState([]);
    const [movieImage,setMovieImage] = useState('')
     const [review,setReview] =useState([])
     const [reviewFilter,setfilteredReview] =useState([])
    const [reviewId,setReviewId] =useState('')
   
    
    const moviesGet = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/movie-list",
            method: "GET",
          });
    
          setmovies(response?.data?.movies);
          
        } catch (error) {
            console.log(error)
        }
      };


     
    
      const imageChange = (id) => {
         let foundImage = movies.find((item) => item._id === id)
         setMovieImage(foundImage.image)
      }

    const movieReview = (movieId) => {
      
      const filteredReview = review.filter((item) => item.movie === movieId)
      setfilteredReview(filteredReview)
   
    }

   

    
       const getReview = async (movieId) => {
        try {
           const response = await axiosInstance({
             url: `admin/movie-rating`,
             method: "GET",
           });
       
            setReview(response?.data?.data);
          
            movieReview(movieId)
           
           
       } catch (error) {
            console.log(error)
         }
       }



       const deletReview = async (id,movie) => {
        try {
         
           await axiosInstance({
             url: `admin/rating/${id}`,
             method: "DELETE",
           });
           
         
              
           getReview(movie)
           movieReview(movie)
           setReviewId(id)

       } catch (error) {
           
            console.log(error)
         }
       }
     
      
     
      useEffect(()=>{
        moviesGet()
        getReview()
       
      },[])

  return (
    <div className='w-full flex flex-col items-center bg-[#f7f7f7] justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Movies List</h1>
  <div className='w-full p-2 md:w-5/6  max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr className='text-center'>
        <th></th>
        <th>Movie name  </th>
        <th >Language</th>
        <th>Genres</th>
        <th>Duration</th>
         <th>Poster</th> 
         <th>Movie Review</th>
        <th>Theater name</th>
        <th> City</th>
        
      </tr>
    </thead>
    <tbody>
      
         {movies.map((item,index)=> (
        
         <tr key={item._id} className='text-center'>
          <th>{index + 1}</th>
          <td>{item.title}</td>
           <td>{item.language}</td>
           <td>{item.genres}</td>
           <td>{item.duration}</td>
           <td> 
           
              <button  onClick={()=>document.getElementById('my_modal_2').showModal()}><h2 onClick={()=> imageChange(item._id)} className="btn ">Image</h2></button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box " >
                <div className='flex justify-center'>
               {  <img src={movieImage} alt={item.title} /> }
                </div>
                  
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog> 
              </td>

              <td>
            
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button  onClick={()=>document.getElementById('my_modal_3').showModal()}><h1 className="btn" onClick={() => getReview(item._id)} >Review</h1></button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
          </form>
          
    {/* table */}

          
   { reviewFilter.length === 0 ? <h1 className='font-semibold '>No review</h1> :  <div className="overflow-x-auto">
      <table className="table text-center">
        {/* head */}
        <thead>
          <tr>
          
            <th>User email</th>
            <th>Review</th>
            <th>posted date</th>
          </tr>
        </thead>
        <tbody>
      
        { reviewFilter.map((item) => (
           <tr  key={item._id}>
           <td>{item.usermail}</td>        
           <td>{item.comment}</td>        
           <td>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</td> 
           <td> { reviewId ===item._id ? <button className="btn bg-gray-500 cursor-not-allowed" >Deleted</button>  : <button className="btn bg-red-500" onClick={() => deletReview(item._id,item.movie)}>Delete</button> }</td>   
       </tr>
        ) )}
         
        

         
         
        </tbody>
      </table>
    </div> }
  </div>
</dialog>       
              </td>
              <td>{item.theaterId.screenName}</td>
              <td>{item.theaterId.city}</td>
           {/* <td>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</td> */}
         
          {/* <td className='text-center'> <Trash onClick={()=> ownerDelete(item._id)} className='mx-auto cursor-pointer'/></td> */}
            
          </tr>
         
        ))} 
     
  
    </tbody>
   
  </table>
</div>
  
  </div>

   </div>
  )
}

export default AdminReviewPage