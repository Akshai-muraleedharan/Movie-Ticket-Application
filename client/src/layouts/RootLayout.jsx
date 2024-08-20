import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function RootLayout() {
  return (
   <>
    <Header />
    <div className='w-full h-96 flex justify-center items-center'>
      hello
    </div>
    <Footer/>
   </>
  )
}

export default RootLayout