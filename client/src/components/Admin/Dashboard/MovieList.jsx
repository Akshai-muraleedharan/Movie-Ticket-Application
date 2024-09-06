import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function MovieList() {
    const [movie, setMovie] = useState([]);

    const TotalMovies = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/movie-list",
            method: "GET",
          });
    
          setMovie(response?.data?.movies);
        } catch (error) {
          console.log(error);
        }
      };

    
      useEffect(()=> {
        TotalMovies ()
       
      },[])




  return (
    <>
    <div className="w-full">
            <h1 className="text-center font-semibold text-2xl capitalize mb-5">
             Movies
            </h1>


            <div className="overflow-x-auto">
              <table className="table  static">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Language</th>
                    <th>Genres</th>                    
                    {/* <th className='border text-center bg-blue-500 text-white cursor-pointer' onClick={()=>movieRating}>Rating</th>                     */}

                  </tr>
                </thead>
                <tbody>
                 
                   
                {movie.map((item)=>(
                     <tr key={item._id}>
                     <td>{item.title}</td>
                    <td>{item.language}</td>
                    <td>{item.genres}</td> 
                    

                   <td >
                    <Link to={`/admins/dashbord/movie-list/movie-rating/${item._id}`}> <Trash2 /> </Link>  
                   </td>
                  </tr>
                ))} 
                
                </tbody>
              </table>
            </div>
           
          </div>
    
    </>
  )
}

export default MovieList