import { connectSocket } from "@/lib/socketManager";
import { useLazyGoogleAuthLoginQuery } from "@/redux/api/apiSlice";
import { setCredentials } from "@/redux/slice/Auth_Slice";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useGoogleLoginHook = () => {
    const [triggerGoogleAuthLogin] = useLazyGoogleAuthLoginQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        const { code } = authResult;
        try {
            if (!code) throw new Error("No auth code received from Google.");

            const response = await triggerGoogleAuthLogin(code);
            if (!response?.data?.response) {
                throw new Error("Google login response is missing user data.");
            }
            if (response.data.response.isNewUser) {
                localStorage.setItem("signupInProgress", "true");

                dispatch(setCredentials({ ...response.data.response }));
                connectSocket(response.data.response._id, dispatch);

                setTimeout(() => navigate("/age"), 100);
            } else {
                dispatch(setCredentials({ ...response.data.response }));
                connectSocket(response.data.response._id, dispatch);

                setTimeout(() => navigate("/home"), 100);
            }

        } catch (error) {
            console.error("Error while logging in with Google:", error);
        }

    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (error) => console.error("Google Login Error:", error),
        flow: "auth-code"
    });

    return {
        googleLogin
    }
}

export default useGoogleLoginHook;