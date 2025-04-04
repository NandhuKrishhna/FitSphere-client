import { useGetAllReviewsAndRatingsQuery } from "@/redux/api/doctorApi";
import { Review } from "@/types/types";
import { format } from "date-fns";
import { useState } from "react";

const useReviewsRating = (id: string) => {
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
    return {
        currentPage,
        itemsPerPage,
        reviewsAndRatings,
        isLoading,
        ratingDistribution,
        averageRating,
        reviews,
        totalReviews,
        totalPages,
        startIndex,
        endIndex,
        paginatedReviews,
        formatReviewDate,
        handlePageChange,
    }

};
export default useReviewsRating;