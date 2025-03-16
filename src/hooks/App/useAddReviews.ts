import { useAddReviewMutation } from "@/redux/api/appApi"
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";
type addReviewProps ={
    doctorId:string,
    rating:number,
    reviewText : string
}
const useAddReview = () => {
     const [addReview,{isLoading :isAddReview}] = useAddReviewMutation();
     const handleAddReview = async ({doctorId , rating, reviewText}:addReviewProps) =>{
        try {
            await addReview({doctorId , rating, reviewText}).unwrap();
        } catch (error) {
            const err = error as ErrorResponse;
            if(err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
     }
     return {
        handleAddReview,isAddReview
     }
}
export default useAddReview