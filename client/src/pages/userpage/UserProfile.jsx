import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";

function UserProfile() {
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/profile",
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
        url: "user/logout",
        method: "GET",
      });

      if (response.data.success === true) {
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hardDelete =async () => {
    try {
    const response =  await axiosInstance({
          url:"/user/delete",
          method:"DELETE"
      })
      
      toast.success("Deleted successfully")

      if (response.data.success === true) {
        navigate("/login")
      }
     
    } catch (error) {
      console.log(error)
      toast.error("something error")
    }
  }

  const softDelete = async () => {
    try {

   const response =   await axiosInstance({
        url:"user/soft-delete",
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
  }, []);

  return (
    <>
      <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 ">
        <div className="grid  grid-cols-1 rounded-md md:grid-cols-2 p-3 shadow-xl">
          <div className="flex justify-between flex-col items-center border-r-2 ">
            <img
              className="w-6/12 rounded-[50%]"
              src={profile.profilePic || ""}
              alt={profile.username || ""}
            />
            <h2>{profile.email}</h2>

            

            <div className="flex justify-between w-full text-xs font-semibold text-red-500">
            <button onClick={softDelete}>Soft Delete</button>
            <button className="mr-2" onClick={hardDelete}> permanent Delete</button>
            <Toaster/>
            </div>
          </div>
          <div className="px-2">
            <div className="flex justify-between items-center">
           <h1 className="font-semibold">Profile </h1>

            <button className=" p-1 bg-blue-500 rounded-md text-white" onClick={logOutHandle}>
              Log-out
            </button>
            </div>

            <form className=" gap-3 flex flex-col ">
              <div>
                <label className="form-control w-full max-w-xs mt-1">
                  <div className="label">
                    <span className="label-text"> Username</span>
                  </div>
                  <input
                    type="text"
                   
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs mt-1">
                  <div className="label">
                    <span className="label-text">E-mail</span>
                  </div>
                  <input
                    type="text"
                   
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs mt-1">
                  <div className="label">
                    <span className="label-text">City</span>
                  </div>
                  <input
                    type="text"
                    
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs mt-1">
                  <div className="label">
                    <span className="label-text">Mobile</span>
                  </div>
                  <input
                    type="text"
                  
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
