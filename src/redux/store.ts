import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/Auth_Slice.ts"
import doctorReducer from "./slice/doctorSlice.ts"
import adminReducer from "./slice/adminSlice.ts"
import storage from "redux-persist/lib/storage";
import appFeatReducer from "./slice/appFeatSlice.ts"
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
import { apiSlice } from "./api/EntryApiSlice.ts";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [ 'auth', 'doctor', 'admin' , 'appFeat']
};
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, 
  auth: authReducer,
  doctor: doctorReducer,
  admin: adminReducer,
  appFeat: appFeatReducer
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
