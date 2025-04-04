import { UserQueryParams } from "@/types/userTypes";
import { apiSlice } from "./EntryApiSlice";
import {
  GetDoctorsResponse,
  GetUsersResponse,
  IApproveDoctorResponse,
  INewSubscriptionResponse,
  ISubscription,
  ISubscriptionResponse,
  IUpdateSubscriptionResponse,
  UpdadedUserResponse
} from "@/types/api/admin-api-types";
import { Roles } from "@/utils/Enums";



export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query<GetUsersResponse, UserQueryParams | undefined>({
      query: (params: UserQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/admin/users${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getAllDoctors: builder.query<GetDoctorsResponse, UserQueryParams | undefined>({
      query: (params: UserQueryParams) => {
        const { ...queryParams } = params;
        const queryString = Object.entries(queryParams)
          .filter(([value]) => value !== undefined && value !== "")
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&");

        return {
          url: `/admin/doctors${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["doctors"],
    }),
    adminLogout: builder.query({
      query: () => ({
        url: "/admin/logout",
        method: "GET",
      }),
    }),
    getNotification: builder.query({
      query: () => ({
        url: "/admin/notification",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    approveRequest: builder.mutation<IApproveDoctorResponse, { id: string }>({
      query: (data) => ({
        url: "/admin/approve-request",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllDoctors", undefined, (draft) => {
            if (!draft.doctors?.doctors) return;
            const doctorIndex = draft.doctors.doctors.findIndex((doctor) => doctor._id === id.id);
            if (doctorIndex !== -1) {
              draft.doctors.doctors[doctorIndex].isApproved = true;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    rejectRequest: builder.mutation({
      query: (data) => ({
        url: "/admin/reject-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    doctorManagement: builder.query({
      query: () => ({
        url: "/admin/doctorDetails",
        method: "GET",
      }),
    }),
    unblockUsers: builder.mutation<UpdadedUserResponse, { id: string; role: string; queryParams?: UserQueryParams }>({
      query: (data) => ({
        url: "/admin/unblock-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ id, role, queryParams }, { dispatch, queryFulfilled }) {
        let patchResult;
        try {
          if (role === Roles.USER) {
            patchResult = dispatch(
              adminApi.util.updateQueryData("getAllUsers", queryParams, (draft) => {
                const user = draft.users?.users?.find((u) => u._id === id);
                if (user) {
                  user.status = "active";
                }
              })
            );
          } else {
            patchResult = dispatch(
              adminApi.util.updateQueryData("getAllDoctors", queryParams, (draft) => {
                const doctor = draft.doctors?.doctors?.find((d) => d._id === id);
                if (doctor) {
                  doctor.status = "active";
                }
              })
            );
          }
          await queryFulfilled;
        } catch {
          patchResult?.undo();
        }
      },
    }),
    blockUsers: builder.mutation<UpdadedUserResponse, { id: string; role: string; queryParams?: UserQueryParams }>({
      query: (data) => ({
        url: "/admin/block-user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ id, role, queryParams }, { dispatch, queryFulfilled }) {
        let patchResult;
        try {
          if (role === Roles.USER) {
            patchResult = dispatch(
              adminApi.util.updateQueryData("getAllUsers", queryParams, (draft) => {
                const user = draft.users?.users?.find((u) => u._id === id);
                if (user) {
                  user.status = "blocked";
                }
              })
            );
          } else {
            patchResult = dispatch(
              adminApi.util.updateQueryData("getAllDoctors", queryParams, (draft) => {
                const doctor = draft.doctors?.doctors?.find((d) => d._id === id);
                if (doctor) {
                  doctor.status = "blocked";
                }
              })
            );
          }
          await queryFulfilled;
        } catch {
          patchResult?.undo();
        }
      },
    }),
    addSubcription: builder.mutation<INewSubscriptionResponse, ISubscription>({
      query: (data) => ({
        url: "/admin/create-subcription-plan",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(newSubscription, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllSubcription", undefined, (draft) => {
            draft.subscriptionPlan.push(newSubscription);
          })
        );

        try {

          const { data: createdSubscription } = await queryFulfilled;
          patchResult.undo();
          dispatch(
            adminApi.util.updateQueryData("getAllSubcription", undefined, (draft) => {
              draft.subscriptionPlan.push(createdSubscription.newPremiumSubscription);
            })
          );
        } catch (error) {
          console.error("Add subscription mutation failed:", error);
        }
      },
    }),
    editSubcription: builder.mutation<IUpdateSubscriptionResponse, ISubscription>({
      query: (data) => ({
        url: "/admin/edit-subcription-plan",
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(updatedSubscription, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllSubcription", undefined, (draft) => {
            if (!draft?.subscriptionPlan) return;
            const subscriptionIndex = draft.subscriptionPlan.findIndex((subscription) => subscription._id === updatedSubscription._id);
            if (subscriptionIndex !== -1) {
              draft.subscriptionPlan[subscriptionIndex] = {
                ...draft.subscriptionPlan[subscriptionIndex],
                ...updatedSubscription
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    deleteSubcription: builder.mutation<{ success: boolean, message: string }, string>({
      query: (id) => ({
        url: `/admin/delete-subscription-plan/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          adminApi.util.updateQueryData("getAllSubcription", undefined, (draft) => {
            draft.subscriptionPlan = draft.subscriptionPlan.filter((sub) => sub._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getAllSubcription: builder.query<ISubscriptionResponse, void>({
      query: () => ({
        url: "/admin/get-subcription-plan",
        method: "GET",
      }),
      providesTags: ["subcription"],
    }),
    adminDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),

  }),

});

export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useGetAllDoctorsQuery,
  useLazyAdminLogoutQuery,
  useGetNotificationQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useDoctorManagementQuery,
  useBlockUsersMutation,
  useUnblockUsersMutation,
  useAddSubcriptionMutation,
  useEditSubcriptionMutation,
  useDeleteSubcriptionMutation,
  useGetAllSubcriptionQuery,
  useAdminDashboardQuery
} = adminApi;
