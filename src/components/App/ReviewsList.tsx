import React, { useState } from "react"
import { Pencil, Trash, ChevronLeft, ChevronRight, Loader } from "lucide-react"
import RatingStars from "./RatingStars"
import type { Review } from "@/types/DoctorDetail"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/slice/Auth_Slice"
import useDeleteReview from "@/hooks/App/useDeleteReviews"
import useEditReview from "@/hooks/App/useEditReview"
import { selectedDoctorId } from "@/redux/slice/appFeatSlice"
import ReviewModal from "./ReviewModal"

type ReviewsListProps = {
  reviews: Review[]
  doctorName: string

}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews , doctorName}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const doctorId = useSelector(selectedDoctorId);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const paginatedReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
  const currentUser = useSelector(selectCurrentUser);
  const { handleEditReview, isEditLoading } = useEditReview();
  const { handleDeleteReview, isDeleteLoading } = useDeleteReview();

  const openEditModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };
  const handleReviewSubmit = async (rating: number, reviewText: string) => {
    if (selectedReview && doctorId) {
      await handleEditReview({
        reviewId: selectedReview._id,
        rating,
        reviewText,
        doctorId
      });
      closeModal();
    }
  };

  return (
    <div className="space-y-6">
      {paginatedReviews.length > 0 ? (
        paginatedReviews.map((review) => (
          <div key={review._id} className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  <img
                    src={review.userDetails?.profilePicture || "/placeholder.svg"}
                    alt={review.userDetails?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{review.userDetails?.name || "Anonymous User"}</p>
                  <div className="flex items-center">
                    <RatingStars rating={review.rating || 0} />
                    <span className="text-xs text-gray-400 ml-2">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown date"}
                    </span>
                  </div>
                </div>
              </div>
              {currentUser?._id === review.userDetails?._id && (
                <div className="flex gap-4">
                  <button onClick={() => openEditModal(review)} className="text-blue-400 hover:text-blue-500">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDeleteReview({reviewId: review._id, doctorId: doctorId!})} className="text-red-400 hover:text-red-500">
                    {isDeleteLoading[review._id] ? <Loader className="animate-spin" size={15} /> : <Trash size={15} />}
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-300 mt-2">{review.reviewText || "No review text provided."}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No reviews available.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-2 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            <ChevronLeft size={15} />
          </button>

          <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-2 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        existingReview={selectedReview}
        doctorName={doctorName}
        isLoading={isEditLoading}
        onSubmit={handleReviewSubmit}
      />
    </div>
  )
}

export default ReviewsList