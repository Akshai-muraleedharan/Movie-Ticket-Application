import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";
import Loader from "../../components/Loader.jsx";


function UserProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/owner/profile",
        method: "GET",
      });

      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandle = async () => {
    try {
      const response = await axiosInstance({
        url: "/owner/logout",
        method: "GET",
      });

      if (response.data.success === true) {
        navigate("/client/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hardDelete =async () => {
    try {
    const response =  await axiosInstance({
          url:"/owner/account-delete",
          method:"DELETE"
      })
      
      toast.success("Deleted successfully")

      if (response.data.success === true) {
        navigate("/client/login")
      }
     
    } catch (error) {
      console.log(error)
      toast.error("something error")
    }
  }

  const softDelete = async () => {
    try {

   const response =   await axiosInstance({
        url:"owner/soft-delete",
        method:"PUT"
      })  

      toast.success("Deleted successfully")

      if (response.data.success === true) {
        navigate("/login")
      }

      
    } catch (error) {
      console.log(error)
      toast.error("Something error")
    }
  }

  useEffect(() => {
    fetchProfile();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  
  if(loading){
    return <Loader/>
   }

  return (
    <>
      <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 ">
        <div className="grid  grid-cols-1 rounded-md md:grid-cols-2 p-3 shadow-xl">
          <div className="flex justify-between flex-col items-center  ">
            <img
              className="w-6/12 rounded-[50%]"
              src={profile.profilePic || ""}
              alt={profile.username || ""}
            />
            <h2 className="font-semibold mt-5">{profile.email}</h2>

            

            
          </div>
          <div className="px-2 flex flex-col justify-between">
            <div className="flex justify-between items-center">
           <h1 className="font-semibold">Profile </h1>

            <button className=" p-1 bg-blue-500 rounded-md text-white" onClick={logOutHandle}>
              Log-out
            </button>
            </div>

            
              <div className="flex flex-col gap-5 mt-5 font-semibold">
              <p>Username: {profile.username}</p>

              <p>E-mail: {profile.email}</p>

               <p>Mobile: {profile.mobile}</p>

               
              </div>
              <div className="flex justify-between w-full text-xs mt-5 mb-2 font-semibold text-red-500">
            <button onClick={softDelete}>Soft Delete</button>
            <button className="mr-2" onClick={hardDelete}> permanent Delete</button>
            <Toaster/>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
