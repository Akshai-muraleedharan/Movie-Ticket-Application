
import {toast,Toaster }from "react-hot-toast";
import { AddMovieButton,  } from '../../components/ui/buttons/Buttons';
import {useForm} from "react-hook-form"
import { axiosInstance } from '../../config/axiosInstance';


function CreateMoviePage() {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()
 
  const onSubmit =async (data) => {
    try {
     console.log(data)
    
      await axiosInstance({
      url:"movie/Movie-create/",
      method:"POST",
      data, 
     })
     
     toast.success("Movie Successfully Added")
     
    } catch (error) {
      toast.error("all fields required")
      
      console.log(error)
    }
  }

  return (
    <>
     <div className='backGround_img_client '>
    <div className="w-full flex  justify-center mt-8 mb-4  items-center ">
      

          {/* validform */}
          <div className="border-0 p-5 w-full md:w-[80%] rounded-md shadow-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl text-white">Post Movies</h2>
            <form className=" gap-3 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" {...register("title")} className="grow" placeholder="Title" />
                  
                </label>
                
              </div>

              <div>
              <label className="input px-0 input-bordered flex items-center gap-2">
  {/* <input type="file" {...register(name="movie-image")} className="file-input file-input-bordered file-input-success w-full " /> */}
                  
                </label>
                {/* <input type="file" {...register("movie-image")} className="file-input file-input-bordered file-input-success w-full " /> */}
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input  type="text" {...register("duration")} className="grow" placeholder="Duration   eg: 137-minutes"/>
                </label>  
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input  type="text" {...register("language")} className="grow" placeholder="Language"/>
                </label>  
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input  type="text" {...register("genres")} className="grow" placeholder="Genure"/>
                </label>  
              </div>



              <AddMovieButton />
              <Toaster/>
            </form>
          </div>
        {/* </div> */}
      </div>

     </div>
    </>
  )
}

export default CreateMoviePage