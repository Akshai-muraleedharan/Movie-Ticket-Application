import React from "react";
import logo from "../assets/image/movie-logo new.png";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="w-full bg-black h-48 px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="">
            <div>
              <img className="w-14 mb-5" src={logo} alt="logo" />
            </div>
          </div>
          {/* grid two */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex gap-3 items-center  ">
              <BsInstagram className="text-4xl instagram allrounded" />
              <FaFacebookSquare className="facebook"/>
              <FaTwitter className="twitter" />
              <FaWhatsapp className="whatsup"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
