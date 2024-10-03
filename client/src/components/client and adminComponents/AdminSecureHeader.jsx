
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { CircleUserRound } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';
import {  useDispatch, useSelector } from 'react-redux'
import {adminPostion} from '../../Redux/admin/adminSlice'

function AdminSecureHeader() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  const fetchProfile = async () => {
    try {

      setLoading(true)
      const response = await axiosInstance({
        url: "/admin/profile",
        method: "GET",
      });
    
       
      setProfile(response.data.data.username);
      dispatch(adminPostion(response.data.data.Position))
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
 

 useEffect(()=>{
  fetchProfile()
 },[])
  

 
  
  return (
    <div className='flex justify-between p-3 items-center'>
          {loading === false ? (
            <div> 
                  <h1 className='text-xs'>Welcome</h1>
                  <p className='font-semibold'>{profile}</p>
                </div> 
          ): ""}
                

      <div>
      <Link to={"profile"}  >   <CircleUserRound />  </Link>
      </div>
    </div>
  )
}

export default AdminSecureHeader
