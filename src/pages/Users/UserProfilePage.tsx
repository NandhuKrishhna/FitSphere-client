import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import { Camera } from "lucide-react";
import useUploadProfilePicture from "../../hooks/UploadProfilePic";

const defaultProfilePic =
  "https://res.cloudinary.com/dzsdfw5vx/image/upload/v1737140482/pngtree-male-physician-doctor-png-image_10167965_mbxbll.png";

const UserProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploardProfileHandler, isLoading } = useUploadProfilePicture();
  const [previewImage, setPreviewImage] = useState(auth.user?.profilePic || defaultProfilePic);

  const handleCameraClick = () => {
    fileInputRef.current?.click(); // Trigger file selection
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setPreviewImage(base64Image); 
      await uploardProfileHandler({ picture: base64Image }); 
    };
  };

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Header />
      <div className="flex flex-col items-center mt-9">
        <div className="relative w-48 h-48 rounded-full overflow-hidden">
          <img
            src={previewImage || auth.user?.profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute z-auto bottom-4 right-6 text-gray-600 flex items-center justify-center rounded-full w-9 h-9 bg-white cursor-pointer"
            onClick={handleCameraClick}
          >
            <Camera />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <p  className="text-white">{isLoading ?"Uploading..." : "Click the camera icon to upload the image"}</p>


        <h1 className="text-xl text-white font-bold mt-4">{auth.user?.name || "Richard Davis"}</h1>
        <p className="text-gray-500">{auth.user?.email || "nandhukrishna@gmail.com"}</p>

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
                <p className="font-medium">{auth.user?.name || "Alec M. Thompson"}</p>
              </div>
              <div>
                <p className="text-gray-500">Mobile:</p>
                <p className="font-medium">(44) 123 1234 123</p>
              </div>
              <div>
                <p className="text-gray-500">Email:</p>
                <p className="font-medium">{auth.user?.email || "alecthompson@mail.com"}</p>
              </div>
              <div>
                <p className="text-gray-500">Location:</p>
                <p className="font-medium">USA</p>
              </div>
            </div>
          </div>

          {/* Conversations Section */}
          <div className="col-span-2 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Conversations</h2>
            <div className="space-y-4">
              {[
                { name: "Sophie B.", message: "Hi I need more information...", image: "/api/placeholder/40/40" },
                { name: "Anne Marie", message: "Awesome work, can you...", image: "/api/placeholder/40/40" },
                { name: "Ivanna", message: "About files I can...", image: "/api/placeholder/40/40" },
                { name: "Peterson", message: "Have a great afternoon.", image: "/api/placeholder/40/40" },
                { name: "Nick Daniel", message: "Hi I need more information...", image: "/api/placeholder/40/40" },
              ].map((conversation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={conversation.image} alt={conversation.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium">{conversation.name}</p>
                      <p className="text-sm text-gray-500">{conversation.message}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">REPLY</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
