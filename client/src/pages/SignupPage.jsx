import React from 'react'
import { Link } from 'react-router-dom'
import {  SignUpPageButton } from '../components/ui/buttons/Buttons'
import { FaRegEyeSlash } from "react-icons/fa6";
function SignupPage() {
  return (
    <div className="w-full flex  justify-center mt-8 mb-4  items-center">

    <div className="grid grid-cols-1 mb-8 md:grid-cols-2 mx-10 signup_box ">

      <div className="hidden md:block backGround_img rounded-l-lg"></div>

      {/* validform */}
      <div className="border-0 p-5 md:border-2 rounded-r-lg ">
        <h2 className="text-center mb-2 font-bold text-2xl">Signup</h2>
        <form className=" gap-3 flex flex-col ">

          {/* username  */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Username" />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
              Username required
            </div>
          </div>
          {/* email */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
              email required
            </div>
          </div>
        {/* password */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="password"
              />
              <FaRegEyeSlash />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            password  required
            </div>
          </div>
      {/* confirm password */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password" className="grow"  placeholder=" Confirm password" />
                <FaRegEyeSlash />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            Confirm password required
            </div>
          </div>
      {/* city */}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="city"
              />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            city required
            </div>
          </div>
      {/* mobile*/}
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="mobile"
              />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
           mobile required
            </div>
          </div>


          <p className="text-xs text-slate-500 mb-1">
            you have an account ?
            <Link to={"/login"}>
              <span className="text-blue-400">Login</span>
            </Link>
          </p>
         
          <SignUpPageButton type="submit" />
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignupPage