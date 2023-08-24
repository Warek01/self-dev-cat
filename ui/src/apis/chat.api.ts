import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ChatWsEvent } from '@ws/enums/ChatWsEvent'
import { chatSocket } from '@ws/sockets/chatSocket'
import type { DeleteAllMessages, Message, SendMessage } from '@/types/Chat'
import type { ApiFindResponse, ApiPaginationRequest } from '@/types/Api'
import type { CreateMessageGroup, MessageGroup } from '@/types/MessageGroup'
import { localStorageHelper } from '@helpers/localStorageHelper'

enum Tag {
  MESSAGE = 'message',
  MESSAGE_GROUP = 'message-group',
}

export const chatApi = createApi({
  tagTypes: ['message', 'message-group'],
  reducerPath: 'chat',
  refetchOnReconnect: true,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
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
    getMessages: builder.query<
      ApiFindResponse<Message>,
      ApiPaginationRequest<{ groupId: number }>
    >({
      providesTags: [Tag.MESSAGE],
      query: (dto) => ({
        url: '/message/all',
        params: dto,
      }),
      onCacheEntryAdded: async (
        _,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved },
      ) => {
        try {
          await cacheDataLoaded

          chatSocket
            .connect()
            .on(ChatWsEvent.RECEIVE_MESSAGE, (message) => {
              updateCachedData((draft) => {
                draft.count++
                draft.items.unshift(message)
              })
            })
            .on(ChatWsEvent.DELETE_MESSAGE, (deleteMessage) => {
              console.log(ChatWsEvent.DELETE_MESSAGE, deleteMessage)
            })

          await cacheEntryRemoved
          chatSocket.disconnect()
        } catch (err) {
          console.error(err)
        }
      },
    }),

    sendMessage: builder.mutation<SendMessage, SendMessage>({
      invalidatesTags: [Tag.MESSAGE],
      queryFn: (dto) => {
        return new Promise((resolve) => {
          chatSocket.emit(ChatWsEvent.SEND_MESSAGE, dto)
          resolve({ data: dto })
        })
      },
    }),

    deleteAllMessages: builder.mutation<DeleteAllMessages, DeleteAllMessages>({
      invalidatesTags: [Tag.MESSAGE],
      queryFn: (dto) => {
        return new Promise((resolve) => {
          chatSocket.emit(ChatWsEvent.DELETE_ALL_MESSAGES, dto)
          resolve({ data: dto })
        })
      },
    }),

    getMessageGroups: builder.query<
      ApiFindResponse<MessageGroup>,
      ApiPaginationRequest<{}>
    >({
      providesTags: [Tag.MESSAGE_GROUP],
      query: (dto) => ({
        url: '/message-group/all',
        params: dto,
      }),
    }),

    getOneMessageGroup: builder.query<MessageGroup, number>({
      providesTags: [Tag.MESSAGE_GROUP],
      query: (id) => ({
        url: `/message-group/${id}`,
      }),
    }),

    createMessageGroup: builder.mutation<MessageGroup, CreateMessageGroup>({
      invalidatesTags: [Tag.MESSAGE_GROUP],
      query: (dto) => ({
        url: `/message-group`,
        body: dto,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useGetMessageGroupsQuery,
  useGetOneMessageGroupQuery,
  useLazyGetMessageGroupsQuery,
  useCreateMessageGroupMutation,
  useLazyGetOneMessageGroupQuery,
  useSendMessageMutation,
  useDeleteAllMessagesMutation,
  usePrefetch,
} = chatApi
