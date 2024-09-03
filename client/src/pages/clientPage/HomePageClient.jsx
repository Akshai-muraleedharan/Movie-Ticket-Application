import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.js";
import Loader from "../../components/Loader.jsx";


function HomePageClient() {
  const [movies,setmovies] =useState([])
  const [loading, setLoading] = useState(true);

  const fetchMovieList = async () => {
      
    try {
      const respone = await axiosInstance({
        url: "/movie/list",
        method: "GET",
      });

      setmovies(respone?.data?.movies)
    } catch (error) {}
  };
 

  useEffect(() => {
    fetchMovieList();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if(loading){
    return <Loader/>
   }

  const moviList = movies.map((item) => {
    return(
      <div className="card[unset] rounded-lg card-compact bg-base-100 w-64 md:w-60 shadow-xl " key={item._id} >
      
      <figure>
        <img
          className="rounded-t-lg w-full max-h-[250px] "
          src={item.image}
          alt={item.title}
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
       Today Release
      </h1>
      <div className="container mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-5">
        {moviList}
        </div>
      </div>
    
    </>
  );
}

export default HomePageClient;
