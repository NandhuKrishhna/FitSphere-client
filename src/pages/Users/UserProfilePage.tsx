import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { Camera } from "lucide-react";
import { useUploadProfilePicMutation } from "../../redux/api/appApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { selectCurrentUser, setProfilePicture } from "../../redux/slice/Auth_Slice";

const UserProfilePage = () => {
  const auth = useSelector(selectCurrentUser);
  // console.log(auth);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [uploadProfilePic, { isLoading }] = useUploadProfilePicMutation();
  const dispatch = useDispatch();
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
        console.log(response);
        dispatch(setProfilePicture(response.profilePicture));
        // console.log("Response after user upload Profile Picture", response);
        toast.success("Profile picture updated successfully!");
      } catch (error: any) {
        console.error("Profile update error:", error);
        toast.error(error?.data?.message || "Failed to update profile");
      }
    };
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#8784F1_0%,_#000_100%)]">
      <Header />
      <div className="flex flex-col items-center mt-9 pb-9">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || auth?.profilePicture || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
            />
            <label
              htmlFor="avatar-upload"
              className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isLoading ? "animate-pulse pointer-events-none" : ""}
                `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isLoading ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <h1 className="text-xl text-white font-bold mt-4">{auth?.name || "Richard Davis"}</h1>
        <p className="text-gray-500">{auth?.email || "nandhukrishna@gmail.com"}</p>

        <div className="w-3/4 grid grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-500 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-white">Progress</h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
            <p className="text-gray-600 mb-4">Hi, I'm Alec Thompson. Decisions: If you can't decide,</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name:</p>
                <p className="font-medium">{auth?.name || "Alec M. Thompson"}</p>
              </div>
              <div>
                <p className="text-gray-500">Mobile:</p>
                <p className="font-medium">(44) 123 1234 123</p>
              </div>
              <div>
                <p className="text-gray-500">Email:</p>
                <p className="font-medium">{auth?.email || "alecthompson@mail.com"}</p>
              </div>
              <div>
                <p className="text-gray-500">Location:</p>
                <p className="font-medium">USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
