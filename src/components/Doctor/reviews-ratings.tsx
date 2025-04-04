import { Star } from "lucide-react";
import { Pagination } from "../App/TestPagination";
import { Review } from "@/types/types";
import { ReviewsSkeleton } from "../skeleton/ReviewsSkeleton";
import useReviewsRating from "@/hooks/App/useReviewsRating";


export default function ReviewsRatings({ id }: { id: string | undefined }) {

  const {
    isLoading,
    averageRating,
    ratingDistribution,
    totalPages,
    handlePageChange,
    totalReviews,
    paginatedReviews,
    formatReviewDate,
    currentPage
  } = useReviewsRating(id!);

  if (isLoading) {
    return <ReviewsSkeleton />;
  }

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Reviews and Ratings</h2>
      </div>

      <div className="flex items-center gap-8 mb-8">
        <h1 className="text-6xl font-bold">{averageRating.toFixed(1)}</h1>
        <div className="space-y-2 w-full">
          {ratingDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-4 text-sm">{item.stars}</span>
              <div className="flex-grow h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-300" style={{ width: `${item.percentage}%` }} />
              </div>
              <span className="text-xs w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {totalReviews === 0 ? (
          <p className="text-sm text-gray-400">No reviews yet.</p>
        ) : (
          <>
            {paginatedReviews.map((review: Review) => (
              <div key={review._id} className="flex gap-3">
                <img
                  src={review.userDetails.profilePicture || "/placeholder.svg?height=40&width=40"}
                  alt={review.userDetails.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{review.userDetails.name}</h3>
                    <span className="text-xs text-gray-400">{formatReviewDate(review.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{review.reviewText}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "text-yellow-300 fill-yellow-300" : "text-gray-400"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

