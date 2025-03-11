import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryApi,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { setLogout } from "../slice/Auth_Slice";

type CustomErrorData = {
  message: string;
  errorCode: string;
};

type CustomError = FetchBaseQueryError & {
  data?: CustomErrorData;
};

// Define base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define base query with reauthentication
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result.error as CustomError;

  if (error?.status === 401 && error?.data?.errorCode === "InvalidAccessToken") {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogout());
    }
  }

  return result;
};

// Create API slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "doctors",
    "users",
    "notification",
    "slots",
    "appointments",
    "wallet",
    "chatsidebar",
    "chats",
    "foodlogs",
    "reviews",
  ],
  endpoints: () => ({}),
});
