import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance';
import { Trash2 } from 'lucide-react';

function OwnerList() {

    const [owner, setOwner] = useState([]);
 
    const TotalOwner = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/owner-All",
            method: "GET",
          });
    
          setOwner(response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      };

      const ownerDelete = async (id) => {
       try {
        const response = await axiosInstance({
            url:`admin/owner/${id}`,
        method:"DELETE"   
         })
         TotalOwner() 
         console.log(response )
       } catch (error) {
        console.log(error)
       }
      }


      useEffect(()=> {
        TotalOwner() 
      },[])

  return (
    <>
      
      <div className="w-full">
            <h1 className="text-center font-semibold text-2xl capitalize mb-5">
            Owners
            </h1>

            <div className="overflow-x-auto">
              <table className="table  static">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Mobile</th>
                   
                  </tr>
                </thead>
                <tbody>
                 
                {owner.map((item)=>(
                     <tr>
                     <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td> 

                  <span className='cursor-pointer' onClick={() =>ownerDelete(item._id)}>
                  <Trash2 />
                  </span>
                  </tr>
                ))}
                
                </tbody>
              </table>
            </div>
           
          </div>
    </>
  )
}

export default OwnerList