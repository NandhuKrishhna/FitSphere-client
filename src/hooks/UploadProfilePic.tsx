import toast from "react-hot-toast";
import { ErrorResponse } from "./LoginHook";
import { useUploadProfilePicMutation } from "../redux/api/appApi";


const useUploadProfilePicture = () => {
   const [uploardProfilePic, { isLoading }] = useUploadProfilePicMutation()
   const uploardProfileHandler = async ({ picture }: { picture: string }) => {
      try {
         await uploardProfilePic(picture).unwrap();
         toast.success("Profile Picture uploaded successfully")
      } catch (error) {
         const err = error as ErrorResponse;
         if (err.data.message) {
            toast.error(err.data.message)
            return
         }
         toast.error("Something went wrong . Please try again")
      }
   }
   return {
      uploardProfileHandler,
      isLoading
   }
}

export default useUploadProfilePicture