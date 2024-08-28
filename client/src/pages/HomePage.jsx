import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance.js";
function HomePage() {
  const [movies,setmovies] =useState([])

  console.log(movies)
  const fetchMovieList = async () => {
    
   
    try {
      const respone = await axiosInstance({
        url: "/movie/list",
        method: "GET",
      });

      // console.log(respone.data);
      setmovies(respone?.data?.movies)
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  const moviList = movies.map((item) => {
    return(
      <div className="card[unset] rounded-lg card-compact bg-base-100 w-56 md:w-60 shadow-xl" key={item._id}>
       {/* <div className="card[unset] rounded-lg card-compact bg-base-100 w-48 md:w-60 shadow-xl"> */}
      <figure>
        <img
          className="rounded-t-lg w-full min-h-[360px] "
          src={item.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
      <div className="flex items-center justify-between">
        <span className="text-xs border-2 border-blue-200 p-1 text-center rounded-lg text-slate-500" >{item.language}</span>
        <span className="text-slate-400 text-xs">{item.genres}</span>
        </div>
     
       <h4 className="card-title">{item.title}</h4>
  
       

      
      </div>
    </div>
    )
  })
  return (
    <>
      <h1 className="text-center mt-24 font-bold text-4xl mb-14">
        New Release
      </h1>
      <div className="container mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-5">
        {moviList}
        </div>
      </div>
    </>
  );
}

export default HomePage;
