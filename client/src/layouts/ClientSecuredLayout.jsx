import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import ClientSecureHeader from '../components/clientComponents/ClientSecureHeader'

function ClientSecuredLayout() {
  return (
    <>
    <div className='root_container'>
    <ClientSecureHeader/>
        <Outlet />
        <Footer />
    </div>
    </>
  )
}

export default ClientSecuredLayout