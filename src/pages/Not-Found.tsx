import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";

export default function NotFound() {
    const navigate = useNavigate();
    const userRole = useSelector(selectCurrentUser)?.role
    const getRedirectPath = () => {
        switch (userRole) {
            case "doctor":
                return "/doctor/dashboard";
            case "admin":
                return "/admin/users-management";
            default:
                return "/home";
        }
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
                <div className="rounded-full bg-muted p-4">
                    <Search className="h-12 w-12 text-primary" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">404 - Not Found</h1>
                    <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                    <Button onClick={() => navigate(getRedirectPath())} variant="default">
                        Sign In
                    </Button>

                </div>
            </div>
        </div>
    )
}

