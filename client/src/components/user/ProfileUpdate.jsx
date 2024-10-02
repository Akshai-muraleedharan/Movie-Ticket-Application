import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../config/axiosInstance'
import { toast, Toaster } from "react-hot-toast";



function ProfileUpdate({setUpdate,profile,fetchProfile}) {
  const {register,handleSubmit} = useForm()
 const [loading,setLoading] =useState(false)
console.log(loading)
  const pageReversal = () => {
   setUpdate(true)  
  }

 
  const submit =async (data) => {
    try {
      setLoading(true)
      const formData = new FormData(); 
      formData.append("profile", data.profile[0]);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      
      const response = await axiosInstance({
        url:"/user/update",
        method:"PUT",
        data: formData,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      fetchProfile()
      toast.success("updated Successfully ");
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("something error");
      setLoading(false)
    }
    }

  return (
   <>
   <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 ">
  <div className='flex justify-end'>
  <button className=" mr-2 text-[20px] "  onClick={ pageReversal}>
          <X/>
        </button>
  </div>
    
    <h2 className='text-center font-semibold mb-5'>Update Profile</h2>
    
           <form    className=" gap-3 flex flex-col " onSubmit={handleSubmit(submit)}>
         
              <div>
              <h1 className='text-xs mb-1 font-semibold'>Username</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Username" {...register("username")} defaultValue={profile.username}/>
                </label>
              </div>

              <div>
              <h1 className='text-xs mb-1 font-semibold'>email</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" {...register("email")} placeholder="Email" defaultValue={profile.email}/>
                </label>
              </div>

              <div>
              <h1 className='text-xs mb-1 font-semibold'>mobile</h1>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" {...register("mobile")} placeholder="Phone number" defaultValue={profile.mobile}/>
                </label>
              </div>

             <div>
            
             <input type="file"className="file-input file-input-bordered file-input-success w-full "  {...register("profile")} name="profile" />
             </div>
             <button className="p-2 text-center md:font-semibold text-white w-full bg-blue-500 mt-2 rounded-md disabled:opacity-80" disabled={loading === true}>{loading === true ? "Loading..." : "Update"}</button>
             <Toaster/>
          </form>
   </div>
   </>
  )
}

export default ProfileUpdate