import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import Loader from "../../components/Loader.jsx";

function TheaterList() {
const [theater,setTheater] = useState([])
const [loading, setLoading] = useState(true);
  



  const theaterFetch = async () => {
    try {
      const response =await axiosInstance({
        url:"/theater/list",
        method:"GET"
      })

      setTheater(response.data.allTheaterList)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=> {
    theaterFetch()

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  },[])

  if(loading){
    return <Loader/>
   }

  return (
    <>
     <h2 className="text-center mt-3 text-2xl font-semibold">Theater List</h2>
      <div className="w-full flex justify-center flex-col items-center">
     
        <div className="container  rounded-md shadow-xl  p-5 mt-5 mb-5">
         
          <div className="overflow-x-auto">
            <table className="table static">
              {/* head */}
              <thead>
                <tr>
            
                  <th>Theater Name</th>
                  <th>Screen type</th>
                  <th>City</th>
                </tr>
              </thead>

              <tbody>
              {theater.map((item)=> (
              
              <>
                {/* row 1 */}
                <tr>
                  
                  <td>{item.screenName}</td>
                  <td> {item.screenType} </td>
                  <td> {item.city} </td>
                </tr>
                </>
               ))}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TheaterList;
