import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth_Slice.ts";
import storage from "redux-persist/lib/storage";
import appFeatReducer from "./slice/appFeatSlice.ts";
import socketReducer from "./slice/socket.ioSlice.ts";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./api/EntryApiSlice.ts";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "appFeat", "socket"],
};
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  appFeat: appFeatReducer,
  socket: socketReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
