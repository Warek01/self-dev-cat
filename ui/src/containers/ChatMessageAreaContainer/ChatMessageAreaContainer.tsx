import { FC, memo, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppSelector } from '../../lib/hooks/useAppSelector'
import * as currentUserSlice from '../../lib/slices/currentUser/currentUser.slice'
import { ChatContext } from '../ChatContainer/ChatContainer.context'
import type { Message } from '../../lib/types/Message'
import { messageGroupClient } from '../../lib/clients/messageGroup.client'
import type { MessageGroup } from '../../lib/types/MessageGroup'
import { useLocalStorage } from '../../lib/hooks/useLocalStorage'
import type { ApiFindResponse } from '../../lib/types/Api'
import {
  ChatHeader,
  ChatInputArea,
  ChatMessagesArea,
} from '../../components/chat'
import { chatSocket } from '../../lib/ws/sockets/chatSocket'
import { ChatWsEvent } from '../../lib/ws/enums/ChatWsEvent'

const ChatMessageAreaContainer: FC = () => {
  const params = useParams()
  const groupId: number = parseInt(params['groupId']!)

  const { user, accessToken } = useAppSelector(
    currentUserSlice.selectCurrentUser,
  )
  const { sendMessage, requestMessages } = useContext(ChatContext)

  const [messages, setMessages] = useLocalStorage<Message[]>(
    `message_group_${groupId}_messages`,
    [],
  )
  const [currentGroup, setCurrentGroup] = useLocalStorage<MessageGroup | null>(
    `message_group_${groupId}`,
    null,
  )

  const handleMessageSend = useCallback(
    async (text: string, files: File[]) => {
      if (!user) {
        return
      }

      try {
        await sendMessage({
          content: text,
          userId: user.id,
          groupId: groupId,
        })
      } catch (err: unknown) {
        console.error(err)
        toast('Could not send message', { type: 'error' })
      }
    },
    [sendMessage, user, accessToken],
  )

  useEffect(() => {
    ;(async () => {
      try {
        const currentGroup: MessageGroup = await messageGroupClient.find(
          groupId,
          accessToken!,
        )

        setCurrentGroup(currentGroup)
      } catch (err: unknown) {
        console.error(err)
        toast('Could not load group', { type: 'error' })
      }
    })()
    ;(async () => {
      try {
        // TODO: implement infinite scroll
        const groupMessages: ApiFindResponse<Message> = await requestMessages(
          groupId,
          0,
          500,
        )

        setMessages(groupMessages.items)
      } catch (err: unknown) {
        console.error(err)
        toast('Could not load messages', { type: 'error' })
      }
    })()
  }, [groupId, accessToken])

  useEffect(() => {
    chatSocket
      .on(ChatWsEvent.RECEIVE_MESSAGE, (newMessage) => {
        setMessages((messages) => [newMessage, ...messages])
      })
      .on(ChatWsEvent.DELETE_ALL_MESSAGES, () => {
        setMessages([])
      })
      .on(ChatWsEvent.DELETE_MESSAGE, (res) => {
        setMessages(messages => messages.filter(message => message.userId !== res.messageId))
      })
  }, [])

  return (
    <main className="flex flex-1 max-h-full flex-col overflow-hidden">
      <ChatHeader group={currentGroup} />
      <ChatMessagesArea messages={messages} />
      <ChatInputArea onSendMessage={handleMessageSend} />
    </main>
  )
}

export default memo(ChatMessageAreaContainer)
