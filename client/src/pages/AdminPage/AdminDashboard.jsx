import React from 'react'
import SideBar from '../../components/Admin/Dashboard/SideBar'
import TopSide from '../../components/Admin/Dashboard/TopSide'

function AdminDashboard() {
  return (
    <>
   <div className='flex'>
   {/* <SideBar className="absolute"/> */}
   <TopSide/>
   </div>
  
    </>
  )
}

export default AdminDashboard