import toast from "react-hot-toast";
import { ErrorResponse } from "./LoginHook";
import { useUploadProfilePicMutation } from "../redux/api/appApi";


const useUploadProfilePicture =  () =>{
const [uploardProfilePic , {isLoading}] = useUploadProfilePicMutation() 
const uploardProfileHandler  = async ({picture}:{picture:string}) =>{
  try {
    console.log(picture)
     const response = await uploardProfilePic(picture).unwrap();
     console.log(response);
     toast.success("Profile Picture uploaded successfully")
  } catch (error) {
     const err = error as ErrorResponse;
     if(err.data.message){
        toast.error(err.data.message)
        return
     }
     toast.error("Something went wrong . Please try again")
  }
}
return{
    uploardProfileHandler,
    isLoading
}
}

export default useUploadProfilePicture