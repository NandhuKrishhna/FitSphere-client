import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Video, Plus, Clipboard, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";
import { Roles } from "@/utils/Enums";

export default function MeetingPage() {
  const user = useSelector(selectCurrentUser);
  const [meetId, setMeetId] = useState("");
  const [newMeetId, setNewMeetId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const id = uuidv4();
    setNewMeetId(id);
    setShowPopup(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newMeetId);
    toast.success("Meeting ID copied to clipboard!");
  };

  const handleJoinMeet = () => {
    if (!user) {
      console.error("User data is missing");
      return;
    }

    if (!meetId?.trim()) {
      console.error("Meeting ID is invalid:", meetId);
      return;
    }

    const navigateTo = user.role === Roles.USER ? `/consultation/${meetId}` : `/doctor/consultation/${meetId}`;

    console.log("Navigating to:", navigateTo);
    navigate(navigateTo);
  };

  return (
    <div className="w-full max-w-md items-center justify-center bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-center mb-8">
          <Video className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold ml-3 text-gray-800">MeetConnect</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium text-gray-700 mb-3">Join a meeting</h2>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter meeting ID"
                value={meetId}
                onChange={(e) => setMeetId(e.target.value)}
                className="flex-1 focus:ring-2 focus:ring-primary/50"
              />
              <Button className="px-4" disabled={!meetId.trim()} onClick={handleJoinMeet}>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <Button className="w-full py-6 text-lg" variant="default" onClick={handleCreateRoom}>
            <Plus className="h-5 w-5 mr-2" />
            Create New Room
          </Button>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">Secure, reliable video meetings for teams of all sizes</p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Meeting ID</h2>
              <button onClick={() => setShowPopup(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-800 font-mono">{newMeetId}</span>
              <button onClick={handleCopy} className="text-primary">
                <Clipboard className="h-5 w-5 hover:text-indigo-400" />
              </button>
            </div>
            <p className="text-sm text-purple-400 italic">Copy the Meeting ID and share it with participants. </p>
            <Button className="mt-4 w-full" onClick={handleJoinMeet}>
              Start Meeting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
