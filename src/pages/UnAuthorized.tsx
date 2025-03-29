import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slice/Auth_Slice";


export default function Unauthorized() {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6">
        <div className="rounded-full bg-muted p-4">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Unauthorized</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page. Please sign in with the appropriate credentials.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 text-black">
          <Button onClick={() => navigate(getRedirectPath())} variant="default">
            Sign In
          </Button>
          <Button
            onClick={() => navigate(getRedirectPath())}
            variant="default"
            className="bg-emerald-300 text-black hover:bg-emerald-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
