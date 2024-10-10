import { X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../config/axiosInstance";
import {toast,Toaster} from 'react-hot-toast'


function SendMail({setUserMail,listArray}) {

    const [usersRole,setUsersRole] = useState("")
    const [loading,setLoading] = useState(false)
    const adminEmail = useSelector((state) => state.admin.email)
    const { register, handleSubmit } = useForm();



    const onSubmit =async (data) => {
        try{
        setLoading(true)
       const response =  await axiosInstance({
          url:"admin/users-email",
          method:"POST",
          data
        })
        setLoading(false)
     if(response.data.success === true){
        toast.success(response.data.message)
     }
     
      
      } catch(error) {    
        
        console.log(error)

        if(error.response.data.success === false){
            toast.error(error.response.data.message)
        }
        setLoading(false)
      }
    }

    const userPage = () => {
        setUserMail(false)
    }

    const getRole = (e) => {
      let usersMail = e.target.value

      let roles = listArray.find((item) => item.email === usersMail)
      setUsersRole(roles.role)

    }
  return (
    <div>
        <div className="flex justify-end">
        <button className="mt-8 mr-4 text-[20px] " onClick={ userPage }>
        <X/>
        </button>
        </div>
      <div className="w-full flex flex-col bg-[#f8f8f8] items-center justify-center p-3 mt-12">
     
        <h1 className="text-center font-semibold text-2xl mb-5">Send Mail</h1>
        
         <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
         <label className="input input-bordered w-full flex items-center gap-2 focus:outline-none cursor-default ">
            From 
            <input type="text" {...register("from")} className="grow w-full input_font" placeholder="Daisy" defaultValue={adminEmail}/>
          </label>

          <label className="input input-bordered w-full items-center  flex  gap-2 focus:outline-none ">
           To 
           <select className="outline-none w-full input_font" {...register("userMail")} onChange={ getRole} >
            <option defaultValue disabled>user@email.com</option>
            {listArray.map((item)=> (
                 <option key={item._id} >{adminEmail === item.email ? null :item.email } </option>
              
            ))}
           </select>
           <div className=" w-full flex  justify-end send_mail">
            <span className="font-semibold ">{usersRole}</span>
           </div>
          </label>

          <label className="input input-bordered w-full flex items-center gap-2 focus:outline-none ">
            Subject
            <input type="text" className="grow w-full input_font" placeholder="Welcome to Movie ticket" {...register("subject")} />
          </label>

          <textarea
            placeholder="Message"
            className="textarea textarea-bordered textarea-lg w-full " {...register("message")} 
          ></textarea>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white text-center px-6 py-2 font-normal uppercase tracking-wider rounded-sm disabled:opacity-80 disabled:cursor-not-allowed">{loading ? "Loading..." : "Send"}</button>
            <Toaster/>
          </div>
         </form>
       
      </div>
    </div>
  );
}

export default SendMail;
