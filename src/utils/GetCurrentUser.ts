import { store } from "@/redux/store";

export const getCurrentUserRole = () => {
  const state = store.getState();
  return state.auth.currentUser?.role;
};
