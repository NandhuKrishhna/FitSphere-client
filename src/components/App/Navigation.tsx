import { Home, BookOpen, Coffee, Settings } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="flex justify-around py-2 border-b border-gray-800">
      <button className="flex flex-col items-center p-2 text-purple-400">
        <Home className="w-5 h-5" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <BookOpen className="w-5 h-5" />
        <span className="text-xs mt-1">Recipes</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <Coffee className="w-5 h-5" />
        <span className="text-xs mt-1">Meals</span>
      </button>
      <button className="flex flex-col items-center p-2 text-gray-500">
        <Settings className="w-5 h-5" />
        <span className="text-xs mt-1">Options</span>
      </button>
    </nav>
  );
}
