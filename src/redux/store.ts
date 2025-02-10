import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/apiSlice.ts";
import authReducer from "./slice/authSlice.ts"
import doctorReducer from "./slice/doctorSlice.ts"
import { doctorApi } from "./api/doctorApi.ts";
import { adminApi } from "./api/adminApi.ts";
import adminReducer from "./slice/adminSlice.ts"
import storage from "redux-persist/lib/storage";
import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { appApi } from "./api/appApi.ts";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['auth', 'doctor', 'admin']
};
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
  auth: authReducer,
  doctor: doctorReducer,
  admin: adminReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      doctorApi.middleware,
      adminApi.middleware,
      appApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
