import { useDispatch } from "react-redux";
import { useLazyLogoutQuery } from "../redux/api/apiSlice";
import toast from "react-hot-toast";
import { setLogout } from "../redux/slice/Auth_Slice";
import { disconnectSocket } from "@/lib/socketManager";
import { resetSocketState } from "@/redux/slice/socket.ioSlice";
import { resetAppState } from "@/redux/slice/appFeatSlice";
import { apiSlice } from "@/redux/api/EntryApiSlice";
import { persistor } from "@/redux/store";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLazyLogoutQuery();
  const handleLogout = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      await logout({}).unwrap();

      dispatch(setLogout());
      disconnectSocket();
      dispatch(resetSocketState());
      dispatch(resetAppState());
      localStorage.clear();
      dispatch(apiSlice.util.resetApiState());
      await persistor.purge();
      toast.success("Logout Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    handleLogout,
  };
};
