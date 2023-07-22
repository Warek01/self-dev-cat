import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { ChatWsEvent } from '../../ws/enums/ChatWsEvent'
import { useAppSelector, usePreviousValue } from 'hooks'
import { selectCurrentUser } from '../../slices/currentUser/currentUser.slice'
import { chatSocket } from '../../ws/sockets/chatSocket'
import { SendMessage } from '../../types/Chat'
import { ChatContainerContextProps } from './ChatContainer.types'
import { messageClient } from '../../clients/message.client'
import { ApiFindResponse } from '../../types/Api'
import { Message } from '../../types/Message'
import { messageGroupClient } from '../../clients/messageGroup.client'
import { ChatContext } from './ChatContainer.context'

export const ChatContainer: FC<PropsWithChildren> = memo(({ children }) => {
  const { user, accessToken } = useAppSelector(selectCurrentUser)
  const prevUser = usePreviousValue(user)

  const sendMessage = useCallback(async (message: SendMessage) => {
    chatSocket.emit(ChatWsEvent.SEND_MESSAGE, message)
  }, [])

  const requestMessages = useCallback(
    (
      groupId: number,
      skip: number,
      limit: number,
    ): Promise<ApiFindResponse<Message>> => {
      return messageClient.getAll(groupId, skip, limit, accessToken!)
    },
    [],
  )

  const requestMessageGroups = useCallback((skip: number, limit: number) => {
    return messageGroupClient.getAll(skip, limit, accessToken!)
  }, [])

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
        sendMessage,
        requestMessages,
        requestMessageGroups,
      }),
      [sendMessage, requestMessages, requestMessageGroups],
    )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
})
