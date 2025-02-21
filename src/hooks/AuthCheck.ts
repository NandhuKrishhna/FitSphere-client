import { setLogout } from "@/redux/slice/Auth_Slice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";

const useAuthCheck = (dispatch: AppDispatch) => {
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    console.log("AuthCheck called:", token?.slice(0, 10) + "...");
    if (!token) {
      dispatch(setLogout());
    }
  }, [dispatch]);
};

export default useAuthCheck;
