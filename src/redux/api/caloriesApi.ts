import { apiSlice } from "./EntryApiSlice";

export const caloriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userHealthDetail: builder.mutation({
      query: (data) => ({
        url: "/app/update-userdetails",
        method: "POST",
        body: data,
      }),
    }),
    //* These are reciepe regenerator endpoints.
    searchFoodItems: builder.mutation({
      query: (data) => ({
        url: "/app/serach-food",
        method: "POST",
        body: data,
      }),
    }),

    generateRecipe: builder.mutation({
      query: (data) => ({
        url: "/app/generate-recipe",
        method: "POST",
        body: data,
      }),
    }),

    getUserHealthDetails: builder.query({
      query: () => ({
        url: "/app/get-userHealthDetails",
        method: "GET",
      }),
    }),

    getUserFoodLogsDetails: builder.query({
      query: (data) => ({
        url: "/app/get-foodlog",
        method: "POST",
        body: data,
      }),
      providesTags: ["foodlogs"],
    }),

    searchFood: builder.mutation({
      query: (data) => ({
        url: "/app/get-foods",
        method: "POST",
        body: data,
      }),
    }),
    addFoodLog: builder.mutation({
      query: (data) => ({
        url: "/app/add-foodlog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["foodlogs"],
    }),
    deleteFoodLog: builder.mutation({
      query: (data) => ({
        url: "/app/delete-food",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["foodlogs"],
    }),
  }),
});

export const {
  useSearchFoodItemsMutation,
  useGenerateRecipeMutation,
  useUserHealthDetailMutation,
  useGetUserHealthDetailsQuery,
  useGetUserFoodLogsDetailsQuery,
  useSearchFoodMutation,
  useAddFoodLogMutation,
  useDeleteFoodLogMutation,
} = caloriesApi;
