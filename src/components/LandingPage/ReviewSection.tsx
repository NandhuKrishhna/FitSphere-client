import { Star} from "lucide-react"; // Import Lucide icons

export default function ReviewSection() {
  return (
    <div className=" flex flex-col md:flex-row w-full overflow-hidden rounded-xl">
      {/* Left section with reviews */}
      <div className="p-8 bg-gray-200 flex-1">
        <div className="space-y-6">
          {/* Metrics */}
          <div className="space-y-4 pl-5">
            <h2 className="text-4xl font-bold">240k+</h2>
            <p className="text-3xl text-gray-600 ">
              Thousands trust and have experienced the benefits of <span className="font-bold">FitSphere</span>.<br/>
              Join them!
            </p>
          </div>

          {/* Rating */}
          <div className="space-y-2 pl-5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">4.8</span>
              <span className="text-xl text-gray-400">/5</span>
            </div>
            <div className="flex gap-1  ">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-7 h-7 fill-yellow-400 text-yellow-500"
                />
              ))}
            </div>
          </div>

          {/* User Avatars */}
          <div className="flex -space-x-3 pl-5">
            {[
              "https://res.cloudinary.com/dzsdfw5vx/image/upload/c_fill,q_auto,f_auto,w_40,h_40/v1737128141/luis-villasmil-Z4rqvRpRj38-unsplash_ahzoio.jpg",
              "https://res.cloudinary.com/dzsdfw5vx/image/upload/c_fill,q_auto,f_auto,w_40,h_40/v1737128057/alex-suprun-ZHvM3XIOHoE-unsplash_vmeye4.jpg",
              "https://res.cloudinary.com/dzsdfw5vx/image/upload/c_fill,q_auto,f_auto,w_40,h_40/v1737128047/oguz-yagiz-kara-MZf0mI14RI0-unsplash_fssfgu.jpg",
              "https://res.cloudinary.com/dzsdfw5vx/image/upload/c_fill,q_auto,f_auto,w_40,h_40/v1737128027/christopher-campbell-rDEOVtE7vOs-unsplash_rtpo7s.jpg",
              "https://res.cloudinary.com/dzsdfw5vx/image/upload/c_fill,q_auto,f_auto,w_40,h_40/v1737128004/michael-dam-mEZ3PoFGs_k-unsplash_v9py0t.jpg",
            ].map((avatar, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              >
                <img
                  src={avatar}
                  alt={`User ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right section with community CTA */}
      <div className="bg-[#0066FF] p-8 flex items-center justify-between md:w-[400px]">
        <h3 className="text-white text-xl font-medium">
          Join FitSphere Community!
        </h3>
      </div>
    </div>
  );
}
