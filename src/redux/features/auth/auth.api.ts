import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
    register: build.mutation({
      query: (userInfo) => ({
        url: "/user",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: build.mutation<
      { success: boolean },
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: build.mutation<
      { success: boolean },
      { email: string; otp: string }
    >({
      query: (data) => ({
        url: "/otp/verify",
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useVerifyOtpMutation,
} = authApi;
