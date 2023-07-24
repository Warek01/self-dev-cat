import { getAccessToken } from "@helpers";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { User } from '@/types/User'
import type { LoginCredentials, RegisterCredentials } from '@/types/Auth'
import type { FriendRequest } from '@/types/FriendRequest'
import type { JwtResponse } from '@/types/JwtResponse'
import { ApiFindResponse } from "../types/Api";

export const userApi = createApi({
  reducerPath: 'user',
  refetchOnReconnect: true,
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void | null>({
      query: () => '/user',
    }),

    login: builder.query<JwtResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/user/login',
        params: credentials,
      }),
    }),

    registerUser: builder.mutation<JwtResponse, RegisterCredentials>({
      query: (dto) => ({
        url: '/user/create',
        body: dto,
      }),
    }),

    getFriends: builder.query<ApiFindResponse<User>, number>({
      query: (id) => `/user/${id}/friends`,
    }),

    getFriendRequests: builder.query<FriendRequest, number>({
      query: (id) => `/user/${id}/friend-requests`,
    }),

    getUser: builder.query<User, number>({
      query: (id) => `/user/${id}`,
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginQuery,
  useLazyLoginQuery,
  useRegisterUserMutation,
  useGetFriendRequestsQuery,
  useLazyGetFriendRequestsQuery,
  useGetFriendsQuery,
  useLazyGetFriendsQuery,
} = userApi
