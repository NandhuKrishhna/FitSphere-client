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
      providesTags :["userHealthDetails"]
    }),

    getUserFoodLogsDetails: builder.query({
      query: (data) => ({
        url: "/app/get-foodlog",
        method: "POST",
        body: data,
      }),
      providesTags: ["foodlogs"],
    }),

    searchFood: builder.query({
      query: ({ query, quantity }) => ({
        url: `/app/get-foods?query=${encodeURIComponent(query)}&quantity=${quantity || ""}`,
        method: "GET",
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
    editFood : builder.mutation({
      query: (data) => ({
        url: "/app/edit-food",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["foodlogs"],
    }),
    getWeightProgress : builder.query({
      query : () => ({
        url:"/app/get-weight-progress",
        method :"GET"
      })
    }),
    updateUserHealthDetails: builder.mutation({
      query : (data) => ({
        url :"/app/update-userdetails",
        method :"PATCH",
        body :data
      }),
      invalidatesTags :["userHealthDetails"]
    }),
  }),
});

export const {
  useSearchFoodItemsMutation,
  useGenerateRecipeMutation,
  useUserHealthDetailMutation,
  useGetUserHealthDetailsQuery,
  useGetUserFoodLogsDetailsQuery,
  useAddFoodLogMutation,
  useDeleteFoodLogMutation,
  useSearchFoodQuery,
  useEditFoodMutation,
  useGetWeightProgressQuery,
  useUpdateUserHealthDetailsMutation
} = caloriesApi;
