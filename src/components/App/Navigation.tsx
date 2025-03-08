import { Link } from "react-router-dom";
import { BookOpen, House, MessageCircle, UserRoundPlus, Video, Wallet } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="flex justify-around py-2 border-b border-gray-800 bg-[#1e1e30]">
      <Link to="/home" className="flex flex-col items-center p-2 text-gray-500">
        <House className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link to="/doctors/all" className="flex flex-col items-center p-2 text-purple-400">
        <UserRoundPlus className="w-5 h-5" />
        <span className="text-xs mt-1">Doctors</span>
      </Link>

      <Link to="/recipes" className="flex flex-col items-center p-2 text-gray-500">
        <BookOpen className="w-5 h-5" />
        <span className="text-xs mt-1">Recipes</span>
      </Link>

      <Link to="/chat" className="flex flex-col items-center p-2 text-gray-500">
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs mt-1">Chat</span>
      </Link>

      <Link to="/wallet" className="flex flex-col items-center p-2 text-gray-500">
        <Wallet className="w-5 h-5" />
        <span className="text-xs mt-1">Wallet</span>
      </Link>
      <Link to="/create-meet" className="flex flex-col items-center p-2 text-gray-500">
        <Video className="w-5 h-5" />
        <span className="text-xs mt-1">Meet</span>
      </Link>
    </nav>
  );
}
