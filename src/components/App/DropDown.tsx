import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu";
  import { AvatarDemo } from "./Avatar";
  
  type Props = {
    user: { name?: string; profilePicture?: string } | null;
    handleLogout: (e: React.FormEvent) => void | Promise<void>;
    isLoading: boolean;
  };
  
  export function AvatarDropdown({ user, handleLogout, isLoading }: Props) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center focus:outline-none" aria-haspopup="true">
            {user && user.profilePicture ? (
              <AvatarDemo image={user.profilePicture} name={user.name} />
            ) : (
              <div className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center">
                <span>
                  {user && user.name ? user.name.slice(0, 2).toUpperCase() : "GU"}
                </span>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
  
        <DropdownMenuContent className="flex flex-col items-center mt-2">
          <DropdownMenuLabel className="text-white">Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => handleLogout(e)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin">...</span>
            ) : (
              <>
                <span className="text-white cursor-pointer">Logout</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  