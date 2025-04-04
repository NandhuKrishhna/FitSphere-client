import { DropdownProps } from "@/types/userTypes";
import { AvatarDemo } from "./Avatar";
import { Roles } from "@/utils/Enums";
import { LogOut, User } from "lucide-react";

export function ProfileDropdown({
    isOpen,
    setIsOpen,
    setIsOtherDropdownOpen,
    dropdownRef,
    user,
    handleLogout,
    isLoading,
    handleNavigate,
}: DropdownProps) {
    return (
        <div className="relative text-white">
            <button
                className="flex items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                    if (setIsOtherDropdownOpen) setIsOtherDropdownOpen(false);
                }}
            >
                <AvatarDemo image={user?.profilePicture} name={user?.name} />
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#1e1e30] rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-3 border-b border-gray-700">
                        <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full  flex items-center justify-center mr-3">
                                <AvatarDemo image={user?.profilePicture} name={user?.name} />
                            </div>
                            <div>
                                <p className="font-medium">{user?.name}</p>
                                <p className="text-xs text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        {user?.role !== Roles.ADMIN &&
                            <>
                                <button className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center" onClick={handleNavigate}>
                                    <User className="w-4 h-4 mr-2" />
                                    <span>Profile</span>
                                </button>
                            </>}
                        <button
                            className="w-full text-left p-3 hover:bg-[#2a2a40] flex items-center text-red-400"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>{isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Logout"}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}