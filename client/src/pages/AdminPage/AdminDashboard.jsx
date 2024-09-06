import React from 'react'

import TopSide from '../../components/Admin/Dashboard/TopSide'
import { Outlet } from 'react-router-dom'


function AdminDashboard() {
  return (
    <>

 
   <TopSide/>
   <div className="w-[90%] mx-auto p-2 gap-5 flex justify-around flex-wrap">
   <Outlet/>
   </div>
  
    </>
  )
}

export default AdminDashboard