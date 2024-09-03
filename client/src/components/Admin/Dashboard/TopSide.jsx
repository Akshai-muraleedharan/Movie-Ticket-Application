import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import Loader from '../../Loader.jsx'

function TopSide() {
  const [userLength, setUserLength] = useState([]);
  const [ownerLength, setOwnerLength] = useState([]);
  const [movieLength, setMovieLength] = useState([]);
  const [admin, setAdmin] = useState([]);
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

  const allAdmin = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/all-admin",
        method: "GET",
      });
      console.log(response);
      setAdmin(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    TotalUser();
    TotalOwner();
    TotalMovie();
    allAdmin();

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
          <div className="w-full md:w-[30%] h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
            {`Total Users : ${userLength.length}`}
          </div>

          <div className="w-full md:w-[30%] h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
            {`Total Owners : ${ownerLength.length}`}
          </div>
          <div className="w-full md:w-[30%]  h-[150px] flex p-2 items-center justify-center cursor-pointer rounded-md shadow-lg font-bold  bg-amber-300">
            {`Total Movies : ${movieLength.length}`}
          </div>

          <div className="w-full">
            <h1 className="text-center font-semibold text-2xl capitalize mb-5">
              ADMIN
            </h1>

            <div className="overflow-x-auto">
              <table className="table  static">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {admin.map((item) => (
                    <tr>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.Position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     
        
      
    </>
  );
}

export default TopSide;
