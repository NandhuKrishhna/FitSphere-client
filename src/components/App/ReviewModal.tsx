// File: components/Reviews/ReviewModal.tsx
import React, { useState } from "react";
import { Star, X } from "lucide-react";

type ReviewModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  doctorName?: string;
  doctorId?: string;
};

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, doctorName, doctorId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log the review data
    console.log({
      doctorId,
      rating,
      reviewText,
    });

    setRating(0);
    setReviewText("");
    // onClose();
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-medium text-white">Rate Your Experience</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">How was your video consultation with Dr. {doctorName}?</p>

            <div className="flex justify-center space-x-2" onMouseLeave={() => setHoveredRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <p className="text-gray-400 mt-2 h-6">
              {rating > 0 && (
                <>
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </>
              )}
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="review" className="block text-gray-300 mb-2">
              Share your experience (optional)
            </label>
            <textarea
              id="review"
              rows={5}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              placeholder="Tell us about your consultation experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
