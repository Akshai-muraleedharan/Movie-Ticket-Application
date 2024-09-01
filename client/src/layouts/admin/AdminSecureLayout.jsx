import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import AdminSecureHeader from '../../components/client and adminComponents/AdminSecureHeader'


function AdminSecureLayout() {
  return (
    <>
    <div className='root_container'>
    <AdminSecureHeader/>
        <Outlet />
        <Footer />
    </div>
    </>
  )
}

export default AdminSecureLayout