import { apiSlice } from "./EntryApiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useSearchFoodItemsMutation, useGenerateRecipeMutation } = chatApi;
