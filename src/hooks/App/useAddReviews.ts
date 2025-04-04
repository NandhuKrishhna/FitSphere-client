import { useAddReviewMutation } from "@/redux/api/appApi"
import { IAddReviewProps } from "@/types/api/doctor-api-types";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

const useAddReview = () => {
    const [addReview, { isLoading: isAddReview }] = useAddReviewMutation();
    const handleAddReview = async ({
        doctorId,
        rating,
        reviewText,
        name,
        profilePicture,
        userId
    }: IAddReviewProps) => {
        try {
            const response = await addReview({
                doctorId,
                rating,
                reviewText,
                name,
                profilePicture,
                userId
            }).unwrap();
            console.log(response)
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        }
    }
    return {
        handleAddReview, isAddReview
    }
}
export default useAddReview