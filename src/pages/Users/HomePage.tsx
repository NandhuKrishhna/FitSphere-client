import { useEffect, useRef, useState } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Settings,
  Home,
  BookOpen,
  Coffee,
  LogOut,
  User,
  X,
} from "lucide-react";
import { useGetUserFoodLogsDetailsMutation } from "@/redux/api/caloriesApi";
import { CircularProgress } from "@/components/App/CircularProgress";
import toast from "react-hot-toast";
import { FoodSearchModal } from "@/components/App/FoodSearchModal";

export interface IFoodItem {
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface MealData {
  breakfast: IFoodItem[];
  lunch: IFoodItem[];
  dinner: IFoodItem[];
  snacks: IFoodItem[];
}

interface FoodLogResponse {
  message: string;
  success: boolean;
  response: {
    _id: string;
    userId: string;
    date: string;
    totalCalories: number;
    totalCarbs: number;
    totalFats: number;
    totalProtien: number;
    requiredCalories: number;
    meals: MealData;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export default function HomePage() {
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split("T")[0]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [foodLogs, setFoodLogs] = useState<FoodLogResponse | null>(null);
  const [getUserFoodLogsDetails] = useGetUserFoodLogsDetailsMutation();
  const hasFetched = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState("");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateWeekDays = (startDate: Date): Array<{ name: string; date: string; dateObj: Date }> => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      days.push({
        name: dayNames[date.getDay()],
        date: date.toISOString().split("T")[0],
        dateObj: new Date(date),
      });
    }

    return days;
  };

  const [days, setDays] = useState(generateWeekDays(currentWeekStart));

  const fetchFoodLogs = async (date: string) => {
    try {
      const response = await getUserFoodLogsDetails({ date }).unwrap();
      setFoodLogs(response as FoodLogResponse);
    } catch (error) {
      console.error("Error fetching food logs:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchFoodLogs(selectedDay);
    }
  }, [selectedDay]);

  const handleDaySelect = (date: string) => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (date > currentDate) {
      return toast.error("Cannot select future date");
    }

    setSelectedDay(date);
    fetchFoodLogs(date);
  };

  const handlePreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setDays(generateWeekDays(newStart));
  };

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setDays(generateWeekDays(newStart));
  };

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;

    const weekStart = new Date(today);
    weekStart.setDate(diff);

    setCurrentWeekStart(weekStart);
    setDays(generateWeekDays(weekStart));
  }, []);

  const mealTypes = foodLogs?.response?.meals
    ? Object.keys(foodLogs.response.meals).map((type) => ({
        id: type,
        type: type.charAt(0).toUpperCase() + type.slice(1),
        recommended: "440 - 550 kcal",
      }))
    : [
        { id: "breakfast", type: "Breakfast", recommended: "440 - 550 kcal" },
        { id: "lunch", type: "Lunch", recommended: "440 - 550 kcal" },
        { id: "dinner", type: "Dinner", recommended: "440 - 550 kcal" },
        { id: "snacks", type: "Snacks", recommended: "440 - 550 kcal" },
      ];

  const totalCalories = foodLogs?.response?.totalCalories || 0;
  const requiredCalories = foodLogs?.response?.requiredCalories || 3000;
  const remainingCalories = requiredCalories - totalCalories;

  const totalProtein = foodLogs?.response?.totalProtien || 0;
  const totalCarbs = foodLogs?.response?.totalCarbs || 0;
  const totalFats = foodLogs?.response?.totalFats || 0;

  const totalMacros = totalProtein + totalCarbs + totalFats;
  const proteinPercentage = totalMacros > 0 ? (totalProtein / totalMacros) * 100 : 0;
  const carbsPercentage = totalMacros > 0 ? (totalCarbs / totalMacros) * 100 : 0;
  const fatsPercentage = totalMacros > 0 ? (totalFats / totalMacros) * 100 : 0;

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  };

  const handleOpenAddFoodModal = (mealId: string) => {
    setSelectedMealType(mealId);
    setIsModalOpen(true);
  };

  const handleSaveFoodItem = (foodItem: IFoodItem, mealType: string) => {
    toast.success(`Added ${foodItem.name} to ${mealType}`);
    fetchFoodLogs(selectedDay);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center">
          <span className="text-xl font-bold text-purple-400">FitSphere</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button className="p-2" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            {isSearchOpen && (
              <div
                ref={searchInputRef}
                className="absolute top-full right-0 mt-2 w-64 bg-[#1e1e30] rounded-lg shadow-lg p-2 z-10 border border-gray-700"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search foods, meals..."
                    className="w-full bg-[#2a2a40] text-white p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    autoFocus
                  />
                  <button className="ml-2 text-gray-400 hover:text-white" onClick={() => setIsSearchOpen(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="p-2 relative"
              onClick={() => {
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
                setIsProfileDropdownOpen(false);
              }}
            >
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {isNotificationDropdownOpen && (
              <div
                ref={notificationDropdownRef}
                className="absolute top-full right-0 mt-2 w-72 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
              >
                <div className="p-3 border-b border-gray-700">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-gray-700 hover:bg-[#2a2a40] cursor-pointer">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold">FS</span>
                      </div>
                      <div>
                        <p className="text-sm">You've reached your protein goal today! 🎉</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-700 hover:bg-[#2a2a40] cursor-pointer">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold">FS</span>
                      </div>
                      <div>
                        <p className="text-sm">New healthy recipes are available for you!</p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#2a2a40] cursor-pointer">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-bold">FS</span>
                      </div>
                      <div>
                        <p className="text-sm">Don't forget to log your dinner for yesterday!</p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-gray-700">
                  <button className="text-sm text-purple-400 hover:text-purple-300">View all notifications</button>
                </div>
              </div>
            )}
          </div>
          <button className="p-2">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          <div className="relative">
            <button
              className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
              onClick={() => {
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
                setIsNotificationDropdownOpen(false);
              }}
            >
              <span className="text-xs font-bold">JS</span>
            </button>
            {isProfileDropdownOpen && (
              <div
                ref={profileDropdownRef}
                className="absolute top-full right-0 mt-2 w-48 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
              >
                <div className="p-3 border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold">JS</span>
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-xs text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
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

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Calories Card */}
          <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Calories</h2>
              <div className="text-xs text-gray-400">Goal • {requiredCalories} kcal</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="relative w-28 h-28">
                <CircularProgress
                  current={totalCalories}
                  total={requiredCalories}
                  size="sm"
                  showPercentage={false}
                  showValues={false}
                  gradientStart="#ff6b00"
                  gradientEnd="#ff9f45"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{remainingCalories}</span>
                  <span className="text-xs text-gray-400">Remaining</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-sm">
                    <div>{totalCalories} kcal</div>
                    <div className="text-xs text-gray-400">Consumed</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <div className="text-sm">
                    <div>0 kcal</div>
                    <div className="text-xs text-gray-400">Burned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Macros Card */}
          <div className="bg-gradient-to-br from-[#1e1e30] to-[#2a2a40] rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Macros</h2>
            </div>
            <div className="space-y-4">
              <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-yellow-500" style={{ width: `${fatsPercentage}%` }}></div>
                  <div className="h-full bg-purple-500" style={{ width: `${carbsPercentage}%` }}></div>
                  <div className="h-full bg-green-500" style={{ width: `${proteinPercentage}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                  <span>Fats: {totalFats}g</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span>Carbs: {totalCarbs}g</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                  <span>Protein: {totalProtein}g</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-full font-medium">
                Set Nutrition Goals
              </button>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <button className="p-2" onClick={handlePreviousWeek}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-2">
              {days.map((day, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center px-1 ${
                    selectedDay === day.date ? "text-white" : isToday(day.date) ? "text-blue-400" : "text-gray-500"
                  }`}
                  onClick={() => handleDaySelect(day.date)}
                >
                  <span className="text-xs">{day.name}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                      selectedDay === day.date
                        ? "bg-orange-500"
                        : isToday(day.date)
                        ? "bg-blue-800 border border-blue-500"
                        : "bg-gray-800"
                    }`}
                  >
                    <span className="text-xs">{day.dateObj.getDate()}</span>
                  </div>
                  <span className="text-xs mt-1">
                    {day.dateObj.getMonth() + 1}/{day.dateObj.getDate()}
                  </span>
                </button>
              ))}
            </div>
            <button className="p-2" onClick={handleNextWeek}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Meal List */}
        <div className="space-y-3">
          {mealTypes.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between bg-[#6b7aff33] p-4 rounded-xl">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">Add {meal.type}</div>
                  <div className="text-xs text-gray-400">Recommended: {meal.recommended}</div>
                </div>
              </div>
              <button
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                onClick={() => handleOpenAddFoodModal(meal.id)}
              >
                <Plus className="w-5 h-5 text-black" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Food Search Modal */}
      <FoodSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mealType={selectedMealType}
        onSave={handleSaveFoodItem}
      />
    </div>
  );
}
