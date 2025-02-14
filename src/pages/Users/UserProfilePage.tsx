
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import { Camera } from "lucide-react";
import { useGetAppointmentDetailsQuery, useUploadProfilePicMutation } from "../../redux/api/appApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { setUpdatingProfile } from "../../redux/slice/authSlice";
import AppointmentList from "../../components/App/AppointmentList";

const UserProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth.user);
  const isUpdatingProfile = useSelector((state:RootState) =>state.auth.isUpdatingProfile)
  const {data}  = useGetAppointmentDetailsQuery({patientId: auth?._id});
  console.log('Appointment Datas:',data)
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [uploadProfilePic ] =useUploadProfilePicMutation()
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
       const response =   await uploadProfilePic({ profilePic: base64Image }).unwrap();
       console.log("Response after user upload Profile Picture",response);
        toast.success("Profile picture updated successfully!");
      } catch (error: any) {
        console.error("Profile update error:", error);
        toast.error(error?.data?.message || "Failed to update profile");
      } 
      finally {
        dispatch(setUpdatingProfile(false));
      }
    };
  };
   
  return (
    <div className="min-h-screen bg-[#0a0a14]">
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
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

        <h1 className="text-xl text-white font-bold mt-4">{auth?.name || "Richard Davis"}</h1>
        <p className="text-gray-500">{auth?.email || "nandhukrishna@gmail.com"}</p>

        {/* Other Profile Sections */}
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

          {/* Conversations Section */}
           <AppointmentList data={data} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
