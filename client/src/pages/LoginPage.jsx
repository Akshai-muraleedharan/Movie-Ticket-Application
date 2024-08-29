import React, { useState } from "react";
import { GoogleSignup,LoginPageButton,
} from "../components/ui/buttons/Buttons";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import {useForm} from "react-hook-form"
// import { UserLogin } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

   

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()

  const onSubmit = async (data) => {

    
    try {
  
      const response = await axiosInstance({
        url:"user/login",
        method:"POST",
        data
      })

     if(response.data.success == true){
      navigate("/user/movies")
     }
     
    } catch (error) {
     
      setErrorMessage(error.response.data)
    }
  }

 

  return (
    <>
      <div className="w-full flex  justify-center mt-8 mb-4  items-center">
        <div className="grid grid-cols-1 mb-8  md:grid-cols-2  login_box ">
          <div className="hidden md:block backGround_img rounded-l-lg"></div>

          {/* validform */}
          <div className="border-0 p-5 md:border-2 rounded-r-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl">Login</h2>
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
              <p className="text-xs text-slate-500 mb-1">
                Don't have an account ?
                <Link to={"/sign-up"}>
                  <span className="text-blue-400">Signup</span>
                </Link>
              </p>
              <LoginPageButton type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
