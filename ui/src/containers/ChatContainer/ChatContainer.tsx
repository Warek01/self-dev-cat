import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { ChatWsEvent } from '../../lib/ws/enums/ChatWsEvent.ts'
import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../lib/slices/currentUser/currentUser.slice.ts'
import { usePreviousValue } from '../../lib/hooks/usePreviousValue.ts'
import { chatSocket } from '../../lib/ws/sockets/chatSocket.ts'
import { ChatContext } from './ChatContainer.context.ts'
import { SendMessage } from '../../lib/ws/types/chat.ts'
import { ChatContainerContextProps } from './ChatContainer.types.ts'

const ChatContainer: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAppSelector(selectCurrentUser)
  const prevUser = usePreviousValue(user)

  const sendMessage = useCallback(async (message: SendMessage) => {
    chatSocket.emit(ChatWsEvent.SEND_MESSAGE, message)
  }, [])

  const requestMessages = useCallback(async () => {}, [])

  useEffect(() => {
    if (!user || user === prevUser) {
      return
    }

    chatSocket
      .on(ChatWsEvent.JOIN_ROOM, (res) => {
        console.log(res)
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
      }),
      [sendMessage, requestMessages],
    )

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}

export default memo(ChatContainer)
