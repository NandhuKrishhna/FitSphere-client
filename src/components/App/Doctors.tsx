import { BadgeCheck, Calendar } from "lucide-react";

type DoctorCardProps = {
  name: string;
  experience: string;
  specialty: string;
  profilePicture: string;
};

const DoctorCard = ({ name, experience, specialty, profilePicture }: DoctorCardProps) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 py-2 rounded-2xl shadow-lg max-w-[15rem] text-center">
      <div className="overflow-hidden rounded-xl flex items-center justify-center">
        <img src={profilePicture} alt={name} className="w-[50%] h-[50%] object-cover" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <h3 className="text-md font-semibold text-black  dark:text-white">{name}</h3>
          <BadgeCheck className="text-green-500 w-5 h-5 mt-1" />
        </div>
        <div className="flex items-center justify-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
          <Calendar size={16} />
          <span>{experience}+ Years</span>
        </div>
        <p className="text-blue-600 dark:text-blue-400 text-sm">{specialty}</p>
        <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition">
          Book
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
