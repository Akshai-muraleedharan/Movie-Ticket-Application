import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance';

function AdminList() {
    const [admin, setAdmin] = useState([]);

    const allAdmin = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/all-admin",
            method: "GET",
          });
        
          setAdmin(response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      };
    

      useEffect(()=> {
        allAdmin()
      },[])
  return (
    <>
       <div className="w-full">
            <h1 className="text-center font-semibold text-2xl capitalize mb-5">
              ADMIN
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
                  {admin.map((item) => (
                    <tr key={item._id}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.Position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </>
  )
}

export default AdminList