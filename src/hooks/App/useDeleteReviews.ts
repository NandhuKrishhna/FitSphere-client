import { useDeleteReviewsMutation } from "@/redux/api/appApi"
import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorResponse } from "react-router-dom";

type useDeleteProps = {
    reviewId: string,
    doctorId: string
}

const useDeleteReview = () => {
    const [deleteReview] = useDeleteReviewsMutation();
    const [isDeleteLoading, setIsDeleteLoading] = useState<{ [key: string]: boolean }>({});
    const handleDeleteReview = async ({ reviewId, doctorId }: useDeleteProps) => {
        if (!reviewId) return toast.error("Review not found");
        if (!doctorId) return toast.error("Doctor not found");
        setIsDeleteLoading((prev) => ({ ...prev, [reviewId]: true }));
        try {
            const response = await deleteReview({ reviewId, doctorId }).unwrap();
            toast.success(response.message);
        } catch (error) {
            const err = error as ErrorResponse;
            if (err.data.message) return toast.error(err.data.message);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsDeleteLoading((prev) => ({ ...prev, [reviewId]: false }));
        }
    }
    return {
        handleDeleteReview,
        isDeleteLoading
    }
}

export default useDeleteReview