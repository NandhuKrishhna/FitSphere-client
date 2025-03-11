import React from "react";
import { Review } from "@/types/DoctorDetail";
import RatingStars from "./RatingStars";

type ReviewsListProps = {
  reviews: Review[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.length > 0 ? (
        reviews.map((review: Review) => (
          <div key={review._id} className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
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
            <p className="text-gray-300">{review.reviewText || "No review text provided."}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewsList;
