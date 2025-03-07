import { apiSlice } from "./EntryApiSlice";

export const chatApi = apiSlice.injectEndpoints({
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
  }),
});

export const {
  useSearchFoodItemsMutation,
  useGenerateRecipeMutation,
  useUserHealthDetailMutation,
  useGetUserHealthDetailsQuery,
} = chatApi;
