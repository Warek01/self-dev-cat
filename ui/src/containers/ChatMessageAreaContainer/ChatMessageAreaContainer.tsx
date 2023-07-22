import { FC, memo, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppSelector } from 'hooks'
import { selectCurrentUser } from '../../slices/currentUser/currentUser.slice'
import type { Message } from '../../types/Message'
import { messageGroupClient } from '../../clients/messageGroup.client'
import type { MessageGroup } from '../../types/MessageGroup'
import { useLocalStorage } from 'hooks'
import type { ApiFindResponse } from '../../types/Api'
import { ChatHeader, ChatInputArea, ChatMessagesArea } from '@components/chat'
import { chatSocket } from '../../ws/sockets/chatSocket'
import { ChatWsEvent } from '../../ws/enums/ChatWsEvent'
import { ChatContext } from '../ChatContainer/ChatContainer.context'

export const ChatMessageAreaContainer: FC = memo(() => {
  const params = useParams()
  const groupId: number = parseInt(params['groupId']!)

  const { user, accessToken } = useAppSelector(selectCurrentUser)
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
        setMessages((messages) =>
          messages.filter((message) => message.user.id !== res.messageId),
        )
      })
  }, [])

  return (
    <main className="flex flex-1 max-h-full flex-col overflow-hidden">
      <ChatHeader group={currentGroup} />
      <ChatMessagesArea messages={messages} />
      <ChatInputArea onSendMessage={handleMessageSend} />
    </main>
  )
})
