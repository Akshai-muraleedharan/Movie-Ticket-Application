import React from 'react'
import './PageNoteFound.css'
import { useNavigate } from 'react-router-dom'


function PageNoteFound() {

    const navigate =useNavigate()
  return (
    <>
  <div className="main">
    	<div className="fof ">
        		<h1>Error 404 Page Not found</h1>        
    	</div>
        <button onClick={()=> navigate(-1)} className='mt-5 border-2 rounded-md p-2'>Back To Page</button>
       
</div>
    </>
  )
}

export default PageNoteFound