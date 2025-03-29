import { useEditReviewMutation } from "@/redux/api/appApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

type editReviewProps = {
  reviewId: string;
  rating: number;
  reviewText: string;
  doctorId: string;
}

const useEditReview = () => {
  const [editReview, { isLoading: isEditLoading }] = useEditReviewMutation();
  const handleEditReview = async ({ reviewId, rating, reviewText, doctorId }: editReviewProps) => {
    try {
      const response = await editReview({ reviewId, rating, reviewText, doctorId }).unwrap();
      toast.success(response.message);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.data.message) return toast.error(err.data.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }
  return {
    handleEditReview,
    isEditLoading
  }
};
export default useEditReview    