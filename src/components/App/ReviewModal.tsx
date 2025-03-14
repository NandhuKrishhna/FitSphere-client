import { useAddReviwsMutation } from "@/redux/api/appApi";
import { Star } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type ReviewModalProps = {
  doctorName: string;
  doctorId: string;
};

const ReviewModal: React.FC<ReviewModalProps> = ({ doctorName, doctorId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [addReview, { isLoading, isError }] = useAddReviwsMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId) return;
  
    try {
      const response = await addReview({ doctorId, rating, reviewText }).unwrap();
      console.log("Review submitted:", response); // Debugging
      toast.success(response.message || "Review submitted successfully!");
  
      setTimeout(() => {
        console.log("Navigating to /appointments");
        navigate("/appointments");
      }, 500);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-black backdrop-blur-sm">
      <div className="bg-gray-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-fadeIn">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-center">
          <h3 className="text-xl font-medium text-white">Rate Your Experience</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-4">How was your video consultation with Dr. {doctorName}?</p>
            <div className="flex justify-center space-x-2" onMouseLeave={() => setHoveredRating(0)}>
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
                    className={`${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-gray-400 mt-2 h-6">
              {rating > 0 &&
                (["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1])}
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
              type="submit"
              disabled={rating === 0 || isLoading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          {isError && <p className="text-red-500 text-sm mt-2">Failed to submit review. Try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
