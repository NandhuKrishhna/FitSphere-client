interface ProfileHeaderProps {
    doctorName?: string;
    specialty?: string;
  }
  
  export const ProfileHeader = ({ doctorName, specialty }: ProfileHeaderProps) => {
    return (
      <div className="bg-[#2C2C2C] p-6 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-[#3A3A3A] mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gray-500">
          <span className="text-white text-2xl font-bold">
            {doctorName?.slice(0, 2).toUpperCase() || "NA"}
          </span>
        </div>
        <h2 className="text-white text-2xl font-bold">{doctorName || "No Name"}</h2>
        <p className="text-gray-300 text-md">{specialty || "Not specified"}</p>
      </div>
    );
  };