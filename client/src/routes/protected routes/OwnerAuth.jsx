import  { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



export const OwnerAuth = ({ children }) => {
   const[user,setuser] = useState()
   const navigate =useNavigate()
   const location =useLocation()

    const checkOwner = async () => {
        try {
            await axiosInstance({
                url:"owner/check-owner",
                method:"GET",
                withCredentials:true
            })
            setuser(true)
           
        } catch (error) {
            navigate("login")
            console.log(error)
        }
    }

    useEffect(()=>{
        checkOwner()
    },[])

    return user ? children : null
  
}





