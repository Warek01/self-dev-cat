import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { ChatWsEvent } from '@ws/enums/ChatWsEvent'
import { useAppSelector, usePreviousValue } from '@hooks'
import { selectCurrentUser } from '@slices/currentUser/currentUser.slice'
import { chatSocket } from '@ws/sockets/chatSocket'
import type { SendMessage } from '@/types/Chat'
import { messageClient } from '@clients'
import type { ApiFindResponse } from '@/types/Api'
import type { Message } from '@/types/Message'
import { messageGroupClient } from '@clients'
import { toast } from 'react-toastify'
import type { MessageGroup } from '../../types/MessageGroup'
import type { CreateMessageGroup } from '../../types/MessageGroup'
import type { ChatContainerContextProps } from './ChatContainer.types'
import { ChatContext } from './ChatContainer.context'

export const ChatContainer: FC<PropsWithChildren> = memo(({ children }) => {
  const { user, accessToken } = useAppSelector(selectCurrentUser)
  const prevUser = usePreviousValue(user)

  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([])

  const sendMessage = useCallback(async (message: SendMessage) => {
    chatSocket.emit(ChatWsEvent.SEND_MESSAGE, message)
  }, [])

  const requestMessages = useCallback(
    (
      groupId: number,
      skip: number,
      limit: number,
    ): Promise<ApiFindResponse<Message>> => {
      return messageClient.getAll(groupId, skip, limit)
    },
    [],
  )

  const requestMessageGroups = useCallback(
    async (skip: number, limit: number): Promise<void> => {
      try {
        const groupsResponse = await messageGroupClient.getAll(skip, limit)
        setMessageGroups(groupsResponse.items)
      } catch (err) {
        console.error(err)
        toast('Failed to load chats', { type: 'error' })
      }
    },
    [],
  )

  const createMessageGroup = useCallback(
    async (dto: CreateMessageGroup): Promise<void> => {
      try {
        await messageGroupClient.create(dto)
        await requestMessageGroups(0, 25)
      } catch (err: unknown) {
        toast('Unable to create group', { type: 'error' })
        console.error(err)
      }
    },
    [user],
  )

  useEffect(() => {
    if (!user || user === prevUser) {
      return
    }

    chatSocket
      .on(ChatWsEvent.JOIN_ROOM, (res) => {
        console.log('join room', res)
      })
      .emit(ChatWsEvent.JOIN_ROOM, {
        userId: user!.id,
        groupId: 1,
      })
  }, [user])

  const contextValue: ChatContainerContextProps =
    useMemo<ChatContainerContextProps>(
      () => ({
        messageGroups,
        createMessageGroup,
        sendMessage,
        requestMessages,
        requestMessageGroups,
      }),
      [
        messageGroups,
        sendMessage,
        requestMessages,
        requestMessageGroups,
        createMessageGroup,
      ],
    )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
})
