      import React, { useEffect, useState } from 'react'
      import { axiosInstance } from '../../config/axiosInstance'

      function AdminTheaterPayment() {


          const [theater,setTheater] = useState([])
          const [theaterApprove,setTheaterApprove] = useState([])
          const [loading,setLoading] = useState(false)

         
        
      const theaterFetch =async () => {
          try{
              const response = await axiosInstance({
                  url:'/admin/theater-list',
                  method:'GET'
              })
              setTheater(response?.data?.allTheaterList)
          }catch(error){
              console.log(error)
          }
      }

      const changeApproval = (id) => {

        let theaterDetails = theater.find((item) => item._id === id)
        setTheaterApprove(theaterDetails)
      
      }

      const approveTheater = async (id,value) => {
        try{
          setLoading(true)
          await axiosInstance({
              url:`admin/theater-approve/${id}`,
              method:'PUT',
              data:{approval:value}
          }) 
        
          setLoading(false)
         
        
        }catch(error){
          console.log(error)
          setLoading(false)
        }
      }

      if(loading === true){
        setTimeout(()=>{
          theaterFetch()
          setLoading(false)    
        },5000)
      }
      

      useEffect(()=>{
          theaterFetch()

        
          
      },[])

  return (
    <div className='w-full flex flex-col items-center bg-[#f7f7f7]  justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Payment List</h1>
  <div className='w-full p-2 md:w-5/6 text-center max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Thearter name</th>
        <th>Owner Email</th>
        <th>place</th>
        <th>Screen Type</th>
        <th>Total payments</th>
        <th>Status</th>
        
      </tr>
    </thead>
    <tbody>
      
        {theater.map((item,index)=> (
        
         <tr className='font-semiBold' key={item._id} >
          <th>{index + 1}</th>
          <td>{item.screenName}</td>
           <td>{item.Ownermail}</td>
          <td>{item.city}</td>
          <td>{item.screenType}</td>
          <td>{item.userPayment.map(item => parseInt(item.moviePayment)).reduce((acc,current)=> acc + current,0 )}</td>
          <td>
           
              <span className="btn cursor-default bg-transparent border-0 text-xs hover:bg-transparent" onClick={()=>document.getElementById('my_modal_3').showModal()}> <button className='hover:text-red-500' onClick={() => changeApproval(item._id)}>{item.access === true ? "approved" : "not-approved"}</button> </span>
              <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                    
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                  
                                          

                       { loading === true ? <div className='text-center font-semibold h-5'>Loading....</div>
                         : <div className="overflow-x-auto mt-5">
                         <table className="table text-center">
                        
                           <thead>
                             <tr>
                             
                               <th>Owner email</th>
                               <th>Theater Name</th>
                               <th>City</th>
                               <th>Screen Type</th>
                               
                             </tr>
                           </thead>
                               <tbody>
 
                           <tr >
                             <td>{theaterApprove.Ownermail} </td>
                             <td>{theaterApprove.screenName} </td>
                             <td>{theaterApprove.city} </td>
                             <td>{theaterApprove.screenType} </td>
                                   
                           </tr>
 
                           </tbody>
                         </table>
                         </div>
                       }
                        <h2 className=' mt-4 font-semibold text-center'>Application</h2>
                        <div className='flex justify-end gap-5 mt-5'>
                          <button onClick={()=> approveTheater(theaterApprove._id,"approved")} className='p-3 rounded-md hover:bg-green-600 bg-green-500 text-white'>approve</button>
                         
                          <button onClick={()=> approveTheater(theaterApprove._id,"not-approve")} className='p-3 rounded-md hover:bg-blue-600 bg-blue-500 text-white'>not-approve</button>
                         
                          <button onClick={()=> approveTheater(theaterApprove._id,"cancel")} className='p-3 rounded-md hover:bg-red-600 bg-red-500 text-white'>cancel</button>
                        
                          
                        </div>
                          </div>
                            </dialog>
                                 </td> 
                                  </tr>
                                 ))}
     
  
    </tbody>
   
  </table>
</div>
  
  </div>

   </div>

  )
}

export default AdminTheaterPayment