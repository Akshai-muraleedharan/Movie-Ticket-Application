import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';


function UserListPage() {


    const [user, setUser] = useState([]);
    const [owner, setOwner] = useState([]);
    const [admin,setAdmin] = useState([])
    const [role,setRole] = useState(false)
    const [query, setQuery] = useState('');
    const [display,setDisplay] = useState(false)
    const [btn,setBtn] = useState(false)
  

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

    const roleChange = () =>{
      setRole(true)
      setBtn(true)
    }

 
    const roleChangeClear =() => {
      setBtn(false)
      setRole(false)
      
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

const usersRoleChange =async (role,id) => {
  
  try {
    if(role === "admin"){
        await axiosInstance({
          url:`admin/users-role/${id}`,
          data:{Role:role},
          method:"POST"

        })
        adminGet()
        userGet()
        ownerGet()
    }
  } catch (error) {
    console.log(error)
  }
}

 const usersInActive = async (id) => {
  try {
    await axiosInstance({
      url:`admin/users-inActive/${id}`,
      method:"PUT"

    })
    adminGet()
    userGet()
    ownerGet()
  } catch (error) {
    console.log(error)
  }
}

const usersActive = async (id) => {
  try {
    await axiosInstance({
      url:`admin/users-Active/${id}`,
      method:"PUT"

    })
    adminGet()
    userGet()
    ownerGet()
  } catch (error) {
    console.log(error)
  }
}


const handleChange = (e) => {
  setQuery(e.target.value);
  setDisplay(true)
     
  if(e.target.value === "Role"){
    setQuery('')
    adminGet()
    userGet()
    ownerGet()
   }

   if(e.target.value === "Active"){
    setQuery("false")
   }else if(e.target.value === "In-Active"){
    setQuery("true")
   }else if(e.target.value === "All-Active"){
    setQuery('')
    adminGet()
    userGet()
    ownerGet()
   }
};




const filteredItems = listArray.filter(item =>
  item.username.toLowerCase().includes(query.toLowerCase()) ||
  item.email.toLowerCase().includes(query.toLowerCase()) ||
  item.role.toLowerCase().includes(query.toLowerCase()) ||
  item.active.toString().includes(query.toString()) 
  
 
);


    useEffect(()=>{
      adminGet()
        userGet()
        ownerGet()
    },[])

  return (
   <div className='w-full flex flex-col bg-[#f7f7f7] items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Users List</h1>

  <div className='w-full p-2 md:w-5/6  max-auto'>

  {/* delete button */}
  <div className='p-2 flex justify-between flex-wrap-reverse'>

  <input type="search" onChange={handleChange} placeholder="Search..." value={query === "admin" || query === "owner" || query === "user" || query === "false" || query === "true" ? "" : query} className="input w-full my-1 max-w-xs" />

     <div>
     {postion === "super-admin" ? <><button className=" my-1 p-1 rounded bg-red-500 md:btn md:bg-red-500 text-white md:text-white" onClick={()=>document.getElementById('my_modal_5').showModal()}>Delete admin</button>
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
            <td> {item.Position === "super-admin" ? "" : <button className="btn bg-red-500 text-white" onClick={() => deleteAdmin(item._id)}>Delete</button>}</td>
          </tr>
          // <button className="btn bg-red-500" onClick={() => deleteAdmin(item._id)}>Delete</button> 
        ))}
         
         
        </tbody>
      </table>
    </div>
     
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className=" btn">Close</button>
      </form>
    </div>
  </div>
</dialog> </>: ""}

  {btn === true ? <button className=' p-1 my-1 rounded bg-blue-500 md:btn  md:bg-blue-500 text-white md:text-white' onClick={roleChangeClear}>clear</button> : postion === "super-admin" ? <button className=' p-1 my-1 rounded bg-blue-500 md:btn  md:bg-blue-500 text-white md:text-white' onClick={roleChange}>Change Role</button> : ""} 
     </div>
  </div>

{display ?  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Username</th>
        <th className='text-center'>Email</th>
        <th>Mobile Number</th>
        <th>
          <select className='outline-none' onChange={handleChange} >
          <option >Role</option>
          <option >admin</option>
          <option >owner</option>
          <option >user</option>
          </select>
          </th>
        <th>Position</th>
        <th>
        <select className='outline-none' onChange={handleChange} >
        <option >All-Active</option>
          <option >Active</option>
          <option >In-Active</option>
         
          </select>
          </th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {filteredItems.length === 0  ? <h1 className='font-semibold '>No Data Found</h1> : filteredItems.map((item,index)=> (
        
         <tr key={item._id}  >
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td >{item.role === "admin" ? item.role : role === true ? <select  onChange={(e) => usersRoleChange(e.target.value,item._id)}>
            <option defaultValue>{item.role}</option>
            <option>admin</option>
          </select> : item.role}</td>
          <td>{item.Position ===  undefined ? "N/A" : item.Position}</td>
          <td className='flex justify-center '>{ item.Position === "super-admin" ? <div className='w-4 h-4 bg-green-700 rounded-full '></div>  : item.active  ? <div className='w-4 h-4 bg-red-400 rounded-full cursor-pointer' onClick={(()=> usersActive(item._id))}></div> :  <div className='w-4 h-4 bg-green-400 rounded-full cursor-pointer' onClick={(()=> usersInActive(item._id))}></div>}</td>
          <td className='text-center'> {item.role === "admin" ? " " : item.role === "user" ? <Trash onClick={()=> userDelete(item._id)} className='mx-auto cursor-pointer'/> : <Trash onClick={()=> ownerDelete(item._id)} className='mx-auto cursor-pointer'/> }</td>
          {/* </div> : <div className='w-4 h-4 bg-green-400 rounded-full'></div> */}
          </tr>
       
        ))}
     
  
    </tbody>
   
  </table>
</div> : <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Username</th>
        <th className='text-center'>Email</th>
        <th>Mobile Number</th>
        <th>
          <select className='outline-none' onChange={handleChange} value={query}>
          <option defaultValue>Role</option>
          <option >Admin</option>
          <option >owner</option>
          <option >user</option>
          </select></th>
        <th>Position</th>
        <th>
        <select className='outline-none' onChange={handleChange} >
        <option >All-Active</option>
          <option >Active</option>
          <option >In-Active</option>
         
          </select>
          
        </th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {listArray.map((item,index)=> (
        
         <tr key={item._id}  >
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td >{item.role === "admin" ? item.role : role === true ? <select  onChange={(e) => usersRoleChange(e.target.value,item._id)}>
            <option defaultValue>{item.role}</option>
            <option>admin</option>
          </select> : item.role}</td>
          <td>{item.Position ===  undefined ? "N/A" : item.Position}</td>
          <td className='flex justify-center '>{ item.Position === "super-admin" ? <div className='w-4 h-4 bg-green-700 rounded-full '></div>  : item.active  ? <div className='w-4 h-4 bg-red-400 rounded-full cursor-pointer' onClick={(()=> usersActive(item._id))}></div> :  <div className='w-4 h-4 bg-green-400 rounded-full cursor-pointer' onClick={(()=> usersInActive(item._id))}></div>}</td>
          <td className='text-center'> {item.role === "admin" ? " " : item.role === "user" ? <Trash onClick={()=> userDelete(item._id)} className='mx-auto cursor-pointer'/> : <Trash onClick={()=> ownerDelete(item._id)} className='mx-auto cursor-pointer'/> }</td>
          {/* </div> : <div className='w-4 h-4 bg-green-400 rounded-full'></div> */}
          </tr>
       
        ))}
     
  
    </tbody>
   
  </table>
</div> }

 
  
  </div>

 
   </div>
  )
}

export default UserListPage