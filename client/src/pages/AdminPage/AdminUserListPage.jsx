import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';

function UserListPage() {


    const [user, setUser] = useState([]);
    const [owner, setOwner] = useState([]);
    const [admin,setAdmin] = useState([])
    
    const postion = useSelector((state) => state.admin.position)
   
    let listArray = []
  

     user.forEach((item) =>{
      listArray.push(item)
    } )

    owner.forEach((item) =>{
      listArray.push(item)
    } )

    admin.forEach((item) =>{
      listArray.push(item)
     
    } )

  
  

    
    

    const adminGet = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/all-admin",
          method: "GET",
        });
  
        setAdmin(response?.data.data)
       
      } catch (error) {
        console.log(error)
      }
    }

    const deleteAdmin = async (id) => {
      try{
        await axiosInstance({
           url:`admin/sub-admin/delete/${id}`,
           method:'DELETE'
       }) 
       
       adminGet()
     }catch(error){
       console.log(error)
     }
    }


    const ownerGet = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/owner-All",
          method: "GET",
        });
  
        setOwner(response?.data?.data);
       
      } catch (error) {
        console.log(error)
      }
    };
 

   
const ownerDelete = async (id) => {
  try{
     await axiosInstance({
        url:`admin/owner/${id}`,
        method:'DELETE'
    }) 
    
    ownerGet()
  }catch(error){
    console.log(error)
  }
}
   
    const userGet = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/all-users",
          method: "GET",
        });
  
        setUser(response?.data?.allUser);
       
      } catch (error) {
        console.log(error)
      }
    };
 

   
const userDelete = async (id) => {
  try{
    await axiosInstance({
        url:`admin/user/${id}`,
        method:'DELETE'
    }) 
    
    userGet()
  }catch(error){
    console.log(error)
  }
}
    useEffect(()=>{
      adminGet()
        userGet()
        ownerGet()
    },[])

  return (
   <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Users List</h1>

  <div className='w-full p-2 md:w-5/6  max-auto'>
  <div className='p-2'>
 {postion === "super-admin" ? <><button className="btn bg-red-500" onClick={()=>document.getElementById('my_modal_5').showModal()}>Delete admin</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
      <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
          
            <th>Name</th>
            <th>Position</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {admin.map((item)=>(
          <tr key={item._id}>
            
            <td>{item.username}</td>
            <td>{item.Position}</td>
            <td><Trash onClick={() => deleteAdmin(item._id)}/></td>
          </tr>
          
        ))}
         
         
        </tbody>
      </table>
    </div>
     
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog> </>: ""}
  </div>
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Username</th>
        <th className='text-center'>Email</th>
        <th>Mobile Number</th>
        <th>Role</th>
        <th>Position</th>
        <th>Active</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {listArray.map((item,index)=> (
        
         <tr key={item._id} >
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>{item.role}</td>
          <td>{item.Position ===  undefined ? "N/A" : item.Position}</td>
          <td className='flex justify-center'>{item.userDeleted  ? <div className='w-4 h-4 bg-red-400 rounded-full'></div> : <div className='w-4 h-4 bg-green-400 rounded-full'></div>}</td>
          <td className='text-center'> {item.role === "admin" ? " " : item.role === "user" ? <Trash onClick={()=> userDelete(item._id)} className='mx-auto cursor-pointer'/> : <Trash onClick={()=> ownerDelete(item._id)} className='mx-auto cursor-pointer'/> }</td>
          
          </tr>
       
        ))}
     
  
    </tbody>
   
  </table>
</div>
  
  </div>

 
   </div>
  )
}

export default UserListPage