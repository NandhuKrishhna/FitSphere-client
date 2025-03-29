
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleOAuthWrapperProps {
  children: ReactNode;
}
const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GoogleOAuthWrapper: React.FC<GoogleOAuthWrapperProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthWrapper;
