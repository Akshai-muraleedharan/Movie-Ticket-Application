import React from "react";
import { LoginPageButton } from "../components/ui/buttons/Buttons";

function LoginPage() {
  return (
    <>
    <h2 className="text-center mt-10 font-bold text-2xl">Login</h2>
      <div className="w-full flex h-96 justify-center  items-center">
        

        <div className="grid grid-cols-1  md:grid-cols-2  bg-red-400">
          <div className="hidden md:block">heoll</div>

          {/* validform */}
          <div className="p-5 gap-3 flex flex-col ">
            <label className="input input-bordered flex items-center gap-2">
             
              <input type="text" className="grow" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              
              <input type="password" className="grow"  />
            </label>

            <LoginPageButton />
          </div>
         
        </div>
      </div>
    </>
  );
}

export default LoginPage;
