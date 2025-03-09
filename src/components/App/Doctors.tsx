import { BadgeCheck, Calendar, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedDoctorId } from "../../redux/slice/appFeatSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type DoctorCardProps = {
  name: string;
  experience: string;
  specialty: string;
  profilePicture: string;
  id: string;
};

const DoctorCard = ({ name, experience, specialty, profilePicture, id }: DoctorCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = () => {
    dispatch(setSelectedDoctorId(id));
    navigate("/doctors/profile");
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
              className="w-[70%] h-[70%] object-cover transition-transform duration-300 hover:scale-105"
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
            <span>{experience}+ Years Experience</span>
          </div>

          <div className="flex items-center justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <div className="bg-purple-500/20 rounded-full px-3 py-1 inline-block">
            <p className="text-purple-300 text-sm font-medium">{specialty}</p>
          </div>

          <button
            onClick={handleCardClick}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mt-2"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
