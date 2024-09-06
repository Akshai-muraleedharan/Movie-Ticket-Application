import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance';
import { Trash2 } from 'lucide-react';

function UserList() {
    const [user, setUser] = useState([]);

    const TotalUser = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/all-users",
            method: "GET",
          });
    
          setUser(response?.data?.allUser);
        } catch (error) {
          console.log(error);
        }
      };

      const userDelete = async (id) => {
        try {
         const response = await axiosInstance({
             url:`admin/user/${id}`,
         method:"DELETE"   
          })
          TotalUser()
      
        } catch (error) {
         console.log(error)
        }
       }
    
useEffect(()=> {
    TotalUser()
})
    
  return (
    <>
    
    <div className="w-full">
            <h1 className="text-center font-semibold text-2xl capitalize mb-5">
             Users
            </h1>

            <div className="overflow-x-auto">
              <table className="table  static">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                 
                     
                {user.map((item)=>(
                     <tr key={item._id}>
                     <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td> 

                  <td className='cursor-pointer' onClick={() => userDelete(item._id)}>
                  <Trash2 />
                  </td>
                  </tr>
                ))}
                
                </tbody>
              </table>
            </div>
           
          </div>
    </>
  )
}

export default UserList