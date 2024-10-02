
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileClientUpdate from "../../components/Clients/ProfileClientUpdate";
import AdminProfileUpdate from "../../components/Admin/AdminProfileUpdate";



function AdminProfilePage() {
  const [profile, setProfile] = useState([]);
  const [update,setUpdate] = useState(true)
  const theaterId = useSelector((state) => state.owner.theaterIds)

  const navigate = useNavigate();
 
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/profile",
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
        url: "/admin/logout",
        method: "POST",
      });
      
      if (response.data.success === true) {
        navigate("/admin/login")
      }
    } catch (error) {
      console.log(error);
    }
  };


  const updateProfile = () => {
    setUpdate(false)
  }

  const hardDelete =async () => {
    try {
    const response =  await axiosInstance({
      url:"/admin/account-delete",
          method:"DELETE"
      })
      
     

      if (response.data.success === true) {
         navigate("/owner/login")
      }
     
    } catch (error) {
      console.log(error)
     
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <><div>
       <button className="mt-8 ml-8 text-[20px] "  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
   
     {update ? <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 ">
      

      
        <div className="grid p-0 grid-cols-1 rounded-md md:grid-cols-2  md:p-3 shadow-xl">
          <div className="flex justify-between flex-col items-center  ">
        
            
           <img className="w-40 rounded-[50%]"src={profile.profilePic || ""} alt={profile.username || ""} />
             
          
            <h2 className="font-semibold mt-5">{profile.email}</h2>
       
          </div>
          <div className="px-2 flex flex-col justify-between">
            <div className="flex justify-between items-center">
                    <details className="dropdown">
                    <summary className="btn m-1">settings</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li><a onClick={()=>document.getElementById('my_modal_4').showModal()}>Delete Account</a></li>
                     
                    </ul>
                    

                      <dialog id="my_modal_4" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                          <h3 className="font-bold text-lg">Delete Account</h3>
                          <p className="py-4">Are you sure to delete this account. The account will delete permanently </p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn mr-2 inline-block text-red-500" onClick={hardDelete}>Delete</button>
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                  </details>

            <button className=" p-1 bg-blue-500 rounded-md text-white" onClick={logOutHandle}>
              Log-out
            </button>
            </div>

            
         <div className="flex flex-col gap-5 mt-5 cursor-default font-semibold" >
           
             <div>
              <label className="text-xs text-slate-400">username</label>
             <div className="flex justify-between w-full">
             <h1>{profile.username}</h1>
             </div> 
             </div>

           

             <div>
              <label className="text-xs text-slate-400">Email</label>
             <div className="flex justify-between w-full">
             <h1>{profile.email}</h1>
             </div> 
             </div>

            

             <div>
              <label className="text-xs text-slate-400">Mobile</label>
             <div className="flex justify-between w-full">
             <h1>{profile.mobile}</h1>
            </div> 
             </div>

              </div>

            
              
        <button onClick={updateProfile} className="p-2 text-center md:font-semibold  text-white w-full bg-blue-500 mt-2 rounded-md">Edit</button>
        
          </div>
        </div>

        
      </div> : <AdminProfileUpdate  setUpdate={setUpdate} profile={profile} fetchProfile={fetchProfile}/>} 
     
    
      </div>
    </>
  );
}

export default AdminProfilePage;
