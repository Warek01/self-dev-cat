import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { User } from '@/types/User'
import type { LoginCredentials, RegisterCredentials } from '@/types/Auth'
import type { FriendRequest } from '@/types/FriendRequest'
import type { FriendRequestsRequest } from '@/types/FriendRequest'
import type { JwtResponse } from '@/types/JwtResponse'
import type { ApiFindResponse, ApiPaginationRequest } from '@/types/Api'
import { localStorageHelper } from '@helpers/localStorageHelper'
import { apiUrl } from '@constants/api-url'

export enum UserApiTag {
  FRIEND_REQUEST = 'friend-request',
  USER = 'user',
  USERS = 'users',
}

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: Object.values(UserApiTag),
  refetchOnReconnect: true,
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      if (localStorageHelper.accessToken) {
        headers.set('Authorization', `Bearer ${localStorageHelper.accessToken}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, string>({
      query: (userId) => apiUrl.user.get(userId),
    }),

    login: builder.mutation<JwtResponse, LoginCredentials>({
      query: (credentials) => ({
        url: apiUrl.auth.login(),
        body: credentials,
        method: 'POST',
      }),
    }),

    registerUser: builder.mutation<JwtResponse, RegisterCredentials>({
      query: (dto) => ({
        url: apiUrl.auth.register(),
        body: dto,
        method: 'POST',
      }),
    }),

    getFriends: builder.query<ApiFindResponse<User>, string>({
      query: (userId) => apiUrl.user.friends(userId),
    }),

    getFriendRequests: builder.query<
      ApiFindResponse<FriendRequest>,
      ApiPaginationRequest<FriendRequestsRequest>
    >({
      providesTags: [UserApiTag.FRIEND_REQUEST],
      query: (query) => ({ url: apiUrl.friendRequest.user(), params: query }),
    }),

    acceptFriendRequest: builder.mutation<void, string>({
      invalidatesTags: [UserApiTag.FRIEND_REQUEST],
      query: (friendRequestId: string) => ({
        url: apiUrl.friendRequest.accept(friendRequestId),
        method: 'PATCH',
      }),
    }),

    denyFriendRequest: builder.mutation<void, string>({
      invalidatesTags: [UserApiTag.FRIEND_REQUEST],
      query: (friendRequestId: string) => ({
        url: apiUrl.friendRequest.deny(friendRequestId),
        method: 'PATCH',
      }),
    }),

    sendFriendRequest: builder.mutation<void, string>({
      invalidatesTags: [UserApiTag.FRIEND_REQUEST],
      query: (userId: string) => ({
        url: apiUrl.friendRequest.send(userId),
        method: 'POST',
      }),
    }),

    getUser: builder.query<User, string>({
      query: (userId) => apiUrl.user.get(userId),
    }),

    getUsers: builder.query<ApiFindResponse<User>, ApiPaginationRequest>({
      providesTags: [UserApiTag.USERS],
      query: (query) => ({
        url: apiUrl.user.getAll(),
        params: query,
      }),
    }),

    getNonFriends: builder.query<ApiFindResponse<User>, ApiPaginationRequest>({
      providesTags: [UserApiTag.USERS],
      query: (query) => ({
        url: apiUrl.user.nonFriends(),
        params: query,
      }),
    }),
  }),
})

export default userApi

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginMutation,
  useRegisterUserMutation,
  useGetFriendRequestsQuery,
  useLazyGetFriendRequestsQuery,
  useGetFriendsQuery,
  useLazyGetFriendsQuery,
  useSendFriendRequestMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useAcceptFriendRequestMutation,
  useDenyFriendRequestMutation,
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useGetNonFriendsQuery,
  useLazyGetNonFriendsQuery,
} = userApi
