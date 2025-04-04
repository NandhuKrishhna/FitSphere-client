import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useDispatch } from "react-redux";
import { setProfilePicture } from "../../redux/slice/Auth_Slice";
import { useUploadProfilePicMutation } from "../../redux/api/appApi";
import toast from "react-hot-toast";
import { ErrorResponse } from "@/hooks/LoginHook";
import { ProfileHeaderProps } from "@/types/types";



const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "Richard Davis",
  email = "user@example.com",
  profilePicture = "/avatar.png"
}) => {
  const dispatch = useDispatch();
  const [uploadProfilePic, { isLoading: uploadLoading }] = useUploadProfilePicMutation();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      try {
        const response = await uploadProfilePic({ profilePic: base64Image }).unwrap();
        dispatch(setProfilePicture(response.profilePicture));
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        const err = error as ErrorResponse;
        if (err.data.message) return toast.error(err.data.message);
        toast.error("Failed to update profile picture!");
      }
    };
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <img
          src={selectedImg || profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 shadow-lg"
        />
        <label
          htmlFor="avatar-upload"
          className={`
            absolute bottom-0 right-0 
            bg-indigo-600 hover:bg-indigo-700
            p-2 rounded-full cursor-pointer 
            transition-all duration-200 shadow-md
            ${uploadLoading ? "animate-pulse pointer-events-none" : ""}
          `}
        >
          <Camera className="w-5 h-5 text-white" />
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadLoading}
          />
        </label>
      </div>
      <h1 className="text-2xl font-bold text-white mt-4">{name}</h1>
      <p className="text-indigo-300">{email}</p>
    </div>
  );
};

export default ProfileHeader;