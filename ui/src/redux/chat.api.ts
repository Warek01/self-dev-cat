import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ChatWsEvent } from '@constants/ws/enums/ChatWsEvent'
import { chatSocket } from '@constants/ws/sockets/chatSocket'
import type { DeleteAllMessages, Message, SendMessage } from '@/types/Chat'
import type { ApiFindResponse, ApiPaginationRequest } from '@/types/Api'
import type { CreateMessageGroup, MessageGroup } from '@/types/MessageGroup'
import { localStorageHelper } from '@helpers/localStorageHelper'
import { apiUrl } from '@constants/api-url'

export enum ChatApiTag {
  MESSAGE = 'message',
  MESSAGE_GROUP = 'message-group',
}

export const chatApi = createApi({
  tagTypes: Object.values(ChatApiTag),
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
      ApiPaginationRequest<{ groupId: string }>
    >({
      providesTags: [ChatApiTag.MESSAGE],
      query: (dto) => ({
        url: apiUrl.message.all(),
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
      invalidatesTags: [ChatApiTag.MESSAGE],
      queryFn: (dto) => {
        return new Promise((resolve) => {
          chatSocket.emit(ChatWsEvent.SEND_MESSAGE, dto)
          resolve({ data: dto })
        })
      },
    }),

    deleteAllMessages: builder.mutation<DeleteAllMessages, DeleteAllMessages>({
      invalidatesTags: [ChatApiTag.MESSAGE],
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
      providesTags: [ChatApiTag.MESSAGE_GROUP],
      query: (dto) => ({
        url: apiUrl.messageGroup.all(),
        params: dto,
      }),
    }),

    getOneMessageGroup: builder.query<MessageGroup, string>({
      providesTags: [ChatApiTag.MESSAGE_GROUP],
      query: (messageGroupId) => ({
        url: apiUrl.messageGroup.getOne(messageGroupId),
      }),
    }),

    createMessageGroup: builder.mutation<MessageGroup, CreateMessageGroup>({
      invalidatesTags: [ChatApiTag.MESSAGE_GROUP],
      query: (dto) => ({
        url: apiUrl.messageGroup.post(),
        body: dto,
        method: 'POST',
      }),
    }),

    postAttachments: builder.mutation<void, FormData>({
      invalidatesTags: [ChatApiTag.MESSAGE],
      query: (formData) => ({
        url: apiUrl.attachment.fromMessage(),
        body: formData,
        method: 'POST',
      }),
    }),
  }),
})

export default chatApi

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
  usePostAttachmentsMutation,
} = chatApi
