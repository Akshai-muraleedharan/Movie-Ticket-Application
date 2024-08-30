import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { LoginPageButton } from '../../components/ui/buttons/Buttons';
import {useForm} from "react-hook-form"
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
function LoginPageClient() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()

  const onSubmit =async (data) => {
    try {
      const response = await axiosInstance({
        url:'/owner/login',
        method:'POST',
        data
      })
      if(response.data.success == true){
        navigate("/clients")
       }
      console.log(response)
    } catch (error) {
      setErrorMessage(error.response.data)
      console.log(error)
    }
  }

  return (
    <>
     <div className='backGround_img_client h-[70vh]'>
    <div className="w-full flex  justify-center mt-8 mb-4  items-center ">
        {/* <div className="grid grid-cols-1 mb-8  md:grid-cols-2  login_box "> */}
          {/* <div className="hidden md:block backGround_img rounded-l-lg"></div> */}

          {/* validform */}
          <div className="border-0 p-5 w-full md:w-[80%] rounded-md shadow-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl text-white">Login</h2>
            <form className=" gap-3 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" {...register("email")} className="grow" placeholder="Email" />
                  
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                {errorMessage.values === "email" ? errorMessage.message : null}
                  
                </div>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input  type="password" {...register("password")} className="grow" placeholder="password"
                  />
                   <FaRegEyeSlash />
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                  {errorMessage.values === "password" ? errorMessage.message : null}
                </div>
              </div>
              <p className="text-xs  mb-1 text-white">
                Don't have an account ?
                <Link to={"/client/signup"}>
                  <span className="text-blue-400">Signup</span>
                </Link>
              </p>
              
              <LoginPageButton type="submit"  />
            </form>
          </div>
        {/* </div> */}
      </div>

     </div>
    </>
  )
}

export default LoginPageClient