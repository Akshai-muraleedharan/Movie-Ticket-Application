import React, { useEffect } from 'react'
import { axiosInstance } from "../../config/axiosInstance.js";
function MovieListPage() {
  console.log(axiosInstance)
  console.log("axiosInstance")
  const fetchMovieList = async () => {
    try {
      const respone = await axiosInstance({
        url: "/movie/list",
        method: "GET",
      });

      console.log(respone.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovieList();
  }, []);
  return (
    <div>MovieListPage</div>
  )
}

export default MovieListPage