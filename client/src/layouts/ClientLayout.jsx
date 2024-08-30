import React from 'react'

import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import ClientHeader from '../components/clientComponents/ClientHeader'

function ClientLayout() {
  return (
    <>
    <div className='root_container'>
    <ClientHeader/>
        <Outlet />
        <Footer />
    </div>
    </>
  )
}

export default ClientLayout