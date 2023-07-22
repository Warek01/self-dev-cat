import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { ChatWsEvent } from '../../lib/ws/enums/ChatWsEvent'
import { useAppSelector } from '../../lib/hooks/useAppSelector'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice'
import { usePreviousValue } from '../../lib/hooks/usePreviousValue'
import { chatSocket } from '../../lib/ws/sockets/chatSocket'
import { ChatContext } from './ChatContainer.context'
import { SendMessage } from '../../lib/ws/types/chat'
import { ChatContainerContextProps } from './ChatContainer.types'
import { messageClient } from '../../lib/clients/message.client'
import { ApiFindResponse } from '../../lib/types/Api'
import { Message } from '../../lib/types/Message'
import { messageGroupClient } from '../../lib/clients/messageGroup.client'

const ChatContainer: FC<PropsWithChildren> = ({ children }) => {
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
}

export default memo(ChatContainer)
