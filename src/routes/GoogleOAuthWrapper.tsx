import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleOAuthWrapperProps {
  children: ReactNode;
}

const GoogleOAuthWrapper: React.FC<GoogleOAuthWrapperProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="97731505655-vaanbbqekfif3u5tek9r8kjm08fk4fen.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthWrapper;
