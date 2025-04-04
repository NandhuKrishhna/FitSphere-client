import { FoodItem, FoodLogResponse, IAddFoodData, IDeleteFoodItem, IDeleteFoodItemResponse, IEditFoodApiResponse, IEditFoodProps, Meals } from "@/types/api/calories-api-types";
import { apiSlice } from "./EntryApiSlice";
import { IGetUserHealthDetails, IUpdateUserHealthDetails, IUpdateUserHealthDetailsResponse } from "@/types/api/user-api-types";
import { HealthDetails } from "@/types/types";

export const caloriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userHealthDetail: builder.mutation({
      query: (data) => ({
        url: "/app/add-userdetails",
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

    getUserHealthDetails: builder.query<IGetUserHealthDetails, void>({
      query: () => ({
        url: "/app/get-userHealthDetails",
        method: "GET",
      }),
    }),

    getUserFoodLogsDetails: builder.query<FoodLogResponse, { date: string }>({
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

    addFoodLog: builder.mutation<FoodLogResponse, IAddFoodData>({
      query: (data) => ({
        url: "/app/add-foodlog",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {

        const tempId = crypto.randomUUID();
        const patchResult = dispatch(
          caloriesApi.util.updateQueryData(
            "getUserFoodLogsDetails",
            { date: arg.date },
            (draft) => {
              if (!draft.response) return;
              if (!draft.response.meals) {
                draft.response.meals = { breakfast: [], lunch: [], dinner: [], snacks: [] };
              }
              const foodItemWithTempId = {
                ...arg.foodItem,
                _id: tempId,
              };
              draft.response.meals[arg.mealType as keyof Meals].push(foodItemWithTempId);
              draft.response.totalCalories += arg.foodItem.calories;
              draft.response.totalCarbs += arg.foodItem.carbs;
              draft.response.totalFats += arg.foodItem.fats;
              draft.response.totalProtien += arg.foodItem.protein;
            }
          )
        );

        try {
          const { data: serverResponse } = await queryFulfilled;
          const serverId = serverResponse.response.meals[arg.mealType as keyof Meals].find(
            (item) => item.name === arg.foodItem.name && item.calories === arg.foodItem.calories
          )?._id;

          if (serverId) {
            dispatch(
              caloriesApi.util.updateQueryData(
                "getUserFoodLogsDetails",
                { date: arg.date },
                (draft) => {
                  if (!draft.response || !draft.response.meals) return;
                  const mealArray = draft.response.meals[arg.mealType as keyof Meals];
                  const foodItemIndex = mealArray.findIndex((item) => item._id === tempId);

                  if (foodItemIndex !== -1) {
                    mealArray[foodItemIndex]._id = serverId;
                  }
                }
              )
            );
          }
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteFoodLog: builder.mutation<IDeleteFoodItemResponse, IDeleteFoodItem>({
      query: (data) => ({
        url: "/app/delete-food",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          caloriesApi.util.updateQueryData(
            "getUserFoodLogsDetails",
            { date: arg.date },
            (draft) => {
              if (!draft.response || !draft.response.meals) return;
              const mealArray = draft.response.meals[arg.mealType as keyof Meals];

              if (Array.isArray(mealArray)) {
                const itemToRemove = mealArray.find((item) => item._id === arg.foodId);

                if (itemToRemove) {
                  draft.response.totalCalories -= itemToRemove.calories;
                  draft.response.totalCarbs -= itemToRemove.carbs;
                  draft.response.totalFats -= itemToRemove.fats;
                  draft.response.totalProtien -= itemToRemove.protein;

                  draft.response.meals[arg.mealType as keyof Meals] = mealArray.filter(
                    (item) => item._id !== arg.foodId
                  );
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    editFood: builder.mutation<IEditFoodApiResponse, IEditFoodProps>({
      query: (data) => ({
        url: "/app/edit-food",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          caloriesApi.util.updateQueryData(
            "getUserFoodLogsDetails",
            { date: arg.date },
            (draft) => {
              if (!draft.response) return;
              const mealArray = draft.response.meals[arg.mealType as keyof Meals];
              if (!Array.isArray(mealArray)) return;

              const foodIndex = mealArray.findIndex((item) => item._id === arg.foodId);
              if (foodIndex === -1) return;
              const oldFoodItem = mealArray[foodIndex];
              draft.response.totalCalories -= oldFoodItem.calories
              draft.response.totalCarbs -= oldFoodItem.carbs
              draft.response.totalProtien -= oldFoodItem.protein
              draft.response.totalFats -= oldFoodItem.fats;

              mealArray[foodIndex] = { ...arg.foodItem, _id: arg.foodId } as FoodItem

              draft.response.totalCalories += arg.foodItem.calories;
              draft.response.totalCarbs += arg.foodItem.carbs!;
              draft.response.totalFats += arg.foodItem.fats!;
              draft.response.totalProtien += arg.foodItem.protein!;
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (data?.foodId) {
            dispatch(
              caloriesApi.util.updateQueryData(
                "getUserFoodLogsDetails",
                { date: arg.date },
                (draft) => {
                  const mealArray = draft.response.meals[arg.mealType as keyof Meals];
                  if (!Array.isArray(mealArray)) return;

                  const foodIndex = mealArray.findIndex((item) => item._id === arg.foodId);
                  if (foodIndex !== -1) {
                    mealArray[foodIndex]._id = data.foodId;
                  }
                }
              )
            );
          }
        } catch {
          patchResult.undo();
        }
      }

    }),
    getWeightProgress: builder.query({
      query: () => ({
        url: "/app/get-weight-progress",
        method: "GET"
      })
    }),
    updateUserHealthDetails: builder.mutation<IUpdateUserHealthDetailsResponse,
      IUpdateUserHealthDetails>({
        query: (data) => ({
          url: "/app/update-userdetails",
          method: "PATCH",
          body: data
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            caloriesApi.util.updateQueryData(
              "getUserHealthDetails",
              undefined,
              (draft) => {
                if (!draft.userHealthDetails) return;
                if (!draft.userHealthDetails) {
                  draft.userHealthDetails = { ...draft.userHealthDetails as object, ...arg } as HealthDetails;
                } else {
                  draft.userHealthDetails = { ...draft.userHealthDetails, ...arg };
                }

              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
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
