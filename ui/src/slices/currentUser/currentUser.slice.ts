import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { User } from '@/types/User'
import type { LoginCredentials, RegisterCredentials } from '@/types/Auth'
import type { FriendRequest } from '@/types/FriendRequest'
import type { JwtResponse } from '@/types/JwtResponse'

export const currentUserApi = createApi({
  reducerPath: 'currentUser',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access_token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
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

    registerUser: builder.mutation<User, RegisterCredentials>({
      query: (dto) => ({
        url: '/user/create',
        body: dto,
      }),
    }),

    getFriends: builder.query<User, number>({
      query: (id) => `/user/${id}/friends`,
    }),

    getFriendRequests: builder.query<FriendRequest, number>({
      query: (id) => `/user/${id}/friend-requests`,
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
} = currentUserApi
