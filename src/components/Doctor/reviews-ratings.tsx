import { ArrowUpDown, Star } from "lucide-react";

export default function ReviewsRatings() {
  const ratingData = [
    { stars: 5, percentage: 80, count: 250 },
    { stars: 4, percentage: 60, count: 120 },
    { stars: 3, percentage: 40, count: 80 },
    { stars: 2, percentage: 20, count: 40 },
    { stars: 1, percentage: 10, count: 10 },
  ];

  const reviews = [
    {
      id: 1,
      name: "Dianne Russell",
      date: "November 16, 2018",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Esther Howard",
      date: "March 8, 2019",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Jane Cooper",
      date: "January 12, 2020",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Reviews and Ratings</h2>
        <ArrowUpDown className="h-5 w-5" />
      </div>

      <div className="flex items-center gap-8 mb-8">
        <h1 className="text-6xl font-bold">4.6</h1>
        <div className="space-y-2 w-full">
          {ratingData.map((item, index) => (
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
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-3">
            <img src={review.avatar || "/placeholder.svg"} alt={review.name} className="w-8 h-8 rounded-full" />
            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium">{review.name}</h3>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-xs text-gray-300 mt-1">{review.comment}</p>
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
      </div>
    </div>
  );
}
