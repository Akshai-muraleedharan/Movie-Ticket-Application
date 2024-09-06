import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import Loader from '../../Loader.jsx'
import { Link } from "react-router-dom";
import AdminSecureHeader from "../../client and adminComponents/AdminSecureHeader.jsx";

function TopSide() {
  const [userLength, setUserLength] = useState([]);
  const [ownerLength, setOwnerLength] = useState([]);
  const [movieLength, setMovieLength] = useState([]);

  const [loading, setLoading] = useState(true);
  const TotalUser = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/all-users",
        method: "GET",
      });

      setUserLength(response?.data?.allUser);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalOwner = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/owner-All",
        method: "GET",
      });

      setOwnerLength(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalMovie = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/movie-list",
        method: "GET",
      });

      setMovieLength(response?.data?.movies);
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    
    TotalUser();
    TotalOwner();
    TotalMovie();
  

    setTimeout(() => {
      setLoading(false);
    }, 2000); 
    
  }, []);

  if (loading) {
    return <Loader />;
  }

  
  return (
    <>
    
        <div className="w-[90%] mx-auto p-2 gap-5 flex justify-around flex-wrap">
        <Link to={"user-list"} className="w-full md:w-[30%] h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
          <div >
            {`Total Users : ${userLength.length}`}
          </div>
      </Link>

      <Link to={'owner-list'} className="w-full md:w-[30%] h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
          <div >
            {`Total Owners : ${ownerLength.length}`}
          </div>

      </Link>

      <Link to={'movie-list'} className="w-full md:w-[30%]  h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
          <div >
            {`Total Movies : ${movieLength.length}`}
          </div>
      </Link>


       
        </div>
     
        
      
    </>
  );
}

export default TopSide;
