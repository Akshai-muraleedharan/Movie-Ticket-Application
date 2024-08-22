import React from "react";
import { GoogleSignup, LoginPageButton } from "../components/ui/buttons/Buttons";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
    
      <div className="w-full flex  justify-center mt-8 mb-16  items-center">
        

        <div className="grid grid-cols-1 mb-8 md:grid-cols-2 login_box " >
          <div className="hidden md:block backGround_img rounded-l-lg">
             
          </div>

          {/* validform */}
          <div className="border-0 p-5 md:border-2 rounded-r-lg ">
          <h2 className="text-center mb-2 font-bold text-2xl">Login</h2>
           <form className=" gap-3 flex flex-col " >
           <label className="input input-bordered flex items-center gap-2">
             
             <input type="text" className="grow" placeholder="Email" />
           </label>

           <label className="input input-bordered flex items-center gap-2">
             
             <input type="password" className="grow"  />
           </label>
          <p className="text-xs text-slate-500 mb-1">Don't have an account ? <Link to={'/sign-up'}><span className="text-blue-400">Signup</span></Link> </p>
           <LoginPageButton type='submit'/>
           </form>
           <p className="text-center mt-5 text-xs text-slate-400">Or</p>
           <GoogleSignup/>
         </div>
           
         
        </div>
      </div>
    </>
  );
}

export default LoginPage;
