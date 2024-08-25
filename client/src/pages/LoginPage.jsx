import React from "react";
import { GoogleSignup,LoginPageButton,
} from "../components/ui/buttons/Buttons";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
function LoginPage() {
  return (
    <>
      <div className="w-full flex  justify-center mt-8 mb-4  items-center">
        <div className="grid grid-cols-1 mb-8  md:grid-cols-2  login_box ">
          <div className="hidden md:block backGround_img rounded-l-lg"></div>

          {/* validform */}
          <div className="border-0 p-5 md:border-2 rounded-r-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl">Login</h2>
            <form className=" gap-3 flex flex-col ">
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Email" />
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                  email required
                </div>
              </div>

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
