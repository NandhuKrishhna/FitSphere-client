import React from "react";
import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
};

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star === Math.ceil(rating) && rating % 1 >= 0.5
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-600 text-gray-600"
          }
        />
      ))}
    </div>
  );
};

export default RatingStars;
