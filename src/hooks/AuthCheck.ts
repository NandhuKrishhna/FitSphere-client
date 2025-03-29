import { setLogout } from "@/redux/slice/Auth_Slice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";

const useAuthCheck = (dispatch: AppDispatch) => {
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      dispatch(setLogout());
    }
  }, [dispatch]);
};

export default useAuthCheck;
