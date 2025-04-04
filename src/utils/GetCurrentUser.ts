import { store } from "@/redux/store";

export const getCurrentUserRole = () => {
  const state = store.getState();
  return state.auth.currentUser?.role;
};

export const getCurrentUserId = () => {
  const state = store.getState();
  return state.auth.currentUser?._id;
};