import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { ReviewModalProps } from "@/types/types";


const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  existingReview,
  doctorName,
  isLoading,
  onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating || 0);
      setReviewText(existingReview.reviewText || "");
    } else {
      setRating(0);
      setReviewText("");
    }
  }, [existingReview, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, reviewText);
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between">
          <h3 className="text-xl font-medium text-white">
            {existingReview ? "Edit Your Review" : "Rate Your Experience"}
          </h3>
          <button onClick={onClose} className="text-gray-400">X</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">
              How was your video consultation with Dr. {doctorName}?
            </p>
            <div
              className="flex justify-center space-x-2"
              onMouseLeave={() => setHoveredRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                      } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="review" className="block text-gray-300 mb-2">
              Share your experience (optional)
            </label>
            <textarea
              id="review"
              rows={5}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:ring-1 focus:ring-purple-500"
              placeholder="Tell us about your consultation experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={rating === 0 || isLoading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;