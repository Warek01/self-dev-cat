import { FC, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import icons from '@icons'
import {
  useGetCurrentUserQuery,
  useGetOneMessageGroupQuery,
  useSendMessageMutation,
} from '@apis'
import { ChatHeader, ChatInputArea, ChatMessagesArea } from '@components/chat'

export const ChatMessageAreaContainer: FC = memo(() => {
  const params = useParams()
  const groupId: number = parseInt(params['groupId']!)

  const user = useGetCurrentUserQuery()
  const currentGroup = useGetOneMessageGroupQuery(groupId)
  const [sendMessage] = useSendMessageMutation()

  const handleMessageSend = useCallback(
    async (text: string, files: File[]) => {
      const trimmedText = text.trim()

      if (!user.data || !trimmedText) {
        return
      }

      try {
        await sendMessage({
          content: trimmedText,
          userId: user.data.id,
          groupId: groupId,
        })
      } catch (err: unknown) {
        console.error(err)
        toast('Could not send message', { type: 'error' })
      }
    },
    [sendMessage, user],
  )

  return (
    <main className="flex flex-1 max-h-full flex-col overflow-hidden">
      {currentGroup.isLoading ? (
        <div>
          <icons.Spinner width={32} height={32} className="animate-spin" />
        </div>
      ) : (
        <>
          <ChatHeader group={currentGroup.data!} />
          <ChatMessagesArea groupId={currentGroup.data?.id!} />
          <ChatInputArea onSendMessage={handleMessageSend} />
        </>
      )}
    </main>
  )
})
