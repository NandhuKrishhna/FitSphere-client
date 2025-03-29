import { useState } from "react";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllReviewsAndRatingsQuery } from "@/redux/api/doctorApi";
import { Pagination } from "../App/TestPagination";

type Review = {
  _id: string;
  userId: string;
  doctorId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  userDetails: {
    _id: string;
    name: string;
    profilePicture: string;
  };
};

export default function ReviewsRatings({ id }: { id: string | undefined }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: reviewsAndRatings, isLoading } = useGetAllReviewsAndRatingsQuery(id);

  const calculateRatingDistribution = () => {
    if (!reviewsAndRatings?.response?.reviews) return [];

    const reviews = reviewsAndRatings.response.reviews;
    const totalReviews = reviews.length;

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review: Review) => {
      counts[review.rating as keyof typeof counts]++;
    });

    return [5, 4, 3, 2, 1].map((stars) => {
      const count = counts[stars as keyof typeof counts];
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { stars, percentage, count };
    });
  };

  const ratingDistribution = calculateRatingDistribution();
  const averageRating = reviewsAndRatings?.response?.averageRating || 0;
  const reviews = reviewsAndRatings?.response?.reviews || [];

  // Pagination logic
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const formatReviewDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

function ReviewsSkeleton() {
  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-7 w-48 bg-white/20" />
        <Skeleton className="h-5 w-5 bg-white/20" />
      </div>

      <div className="flex items-center gap-8 mb-8">
        <Skeleton className="h-16 w-16 bg-white/20" />
        <div className="space-y-2 w-full">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 bg-white/20" />
              <Skeleton className="flex-grow h-2 bg-white/20 rounded-full" />
              <Skeleton className="w-8 h-4 bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex gap-3">
            <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-full">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24 bg-white/20" />
                <Skeleton className="h-3 w-20 bg-white/20" />
              </div>
              <Skeleton className="h-3 w-full mt-2 bg-white/20" />
              <Skeleton className="h-3 w-3/4 mt-1 bg-white/20" />
              <div className="flex mt-2 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-3.5 h-3.5 bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}