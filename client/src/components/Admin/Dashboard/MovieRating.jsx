import React, { useEffect } from 'react'
import { axiosInstance } from '../../../config/axiosInstance'
import { useParams } from 'react-router-dom'

function MovieRating() {
  const {id} =useParams()

    const movieRating = async() => {
        try {
          const response = await axiosInstance({
            url:`/rating/movie-rating/${id}`,
            method:"GET"
          })

          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=> {
        movieRating()
       
      },[])

  return (
    <div>MovieRating</div>
  )
}

export default MovieRating