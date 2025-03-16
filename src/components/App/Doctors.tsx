import { BadgeCheck, Calendar, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedDoctorId } from "../../redux/slice/appFeatSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetAllRatingsQuery } from "@/redux/api/appApi";
import { Button } from "@/components/ui/button"
import { Badge } from "@mui/material";

type DoctorCardProps = {
  name: string;
  experience: string;
  specialty: string;
  profilePicture: string;
  id: string;
};

type Rating = {
  doctorId: string;
  averageRating: number;
  totalReviews: number;
};

const DoctorCard = ({ name, experience, specialty, profilePicture, id }: DoctorCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ratingsData } = useGetAllRatingsQuery({});
  const doctorRating = ratingsData?.response?.find((rating: Rating) => rating.doctorId === id);
  const averageRating = doctorRating?.averageRating || 0;

  const handleCardClick = () => {
    dispatch(setSelectedDoctorId(id));
    navigate("/doctors/details");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="p-4">
        <div className="relative">
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-indigo-900/30 flex items-center justify-center">
            <img
              src={profilePicture || "/placeholder.svg"}
              alt={name}
              className="w-[full] h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-sm p-1 rounded-full">
            <BadgeCheck className="text-green-400 w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 space-y-3 text-center">
          <h3 className="text-lg font-bold text-white tracking-tight">{name}</h3>

          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Calendar size={16} className="text-purple-400" />
            <span className="text-sm text-indigo-400">{experience}+ Years Experience</span>
          </div>

          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = star <= Math.floor(averageRating);
              const halfFilled = !filled && star === Math.ceil(averageRating) && averageRating % 1 >= 0.5;

              return (
                <Star
                  key={star}
                  size={14}
                  className={`
                    ${
                      filled
                        ? "fill-yellow-400 text-yellow-400"
                        : halfFilled
                        ? "fill-yellow-400 text-yellow-400 fill-half"
                        : "fill-gray-600 text-gray-600"
                    }
                  `}
                />
              );
            })}
            {doctorRating?.totalReviews > 0 && (
              <span className="text-xs text-gray-400 ml-1">({doctorRating.totalReviews})</span>
            )}
          </div>

          <div className="bg-purple-500/20 rounded-full inline-block">
            <Badge className="text-indigo-300 text-sm py-1 px-2">{specialty}</Badge>
          </div>
           
        </div>
          <Button onClick={handleCardClick}
          className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors">Book</Button>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
