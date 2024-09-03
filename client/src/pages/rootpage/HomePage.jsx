import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.js";
import {useNavigate} from 'react-router-dom'
import Loader from "../../components/Loader.jsx";

function HomePage() {
  const [movies,setmovies] =useState([])
  const [loading, setLoading] = useState(true);
 const navigate = useNavigate()
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
  const handleClick = () => {
    navigate('/login')
  }

  useEffect(() => {
    fetchMovieList();
    setTimeout(() => {
      setLoading(false);
    }, 2000); 

  }, []);

  if (loading) {
    return <Loader />;
  }

  const moviList = movies.map((item) => {
    return(
      <div className="card[unset] rounded-lg card-compact bg-base-100 w-64 md:w-60 shadow-xl cursor-pointer" key={item._id} onClick={handleClick}>
       {/* <div className="card[unset] rounded-lg card-compact bg-base-100 w-48 md:w-60 shadow-xl"> */}
      <figure>
        <img
          className="rounded-t-lg w-full max-h-[250px] "
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
