import { FC, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'

import icons from '@icons'
import {
  useGetCurrentUserQuery,
  useGetOneMessageGroupQuery,
  usePostAttachmentsMutation,
  useSendMessageMutation,
} from '@apis'
import { ChatHeader, ChatInputArea, ChatMessagesArea } from '@components/chat'

export const ChatMessageAreaContainer: FC = memo(() => {
  const params = useParams()
  const groupId = params['groupId']!

  const user = useGetCurrentUserQuery()
  const currentGroup = useGetOneMessageGroupQuery(groupId)
  const [sendMessage] = useSendMessageMutation()
  const [postAttachments] = usePostAttachmentsMutation()

  const handleMessageSend = useCallback(
    async (text: string, files?: File[]) => {
      const trimmedText = text.trim() || null

      if (!user.data) {
        throw new Error(`user data missing`)
      }

      const messageId = uuid()

      if (files?.length) {
        const formData = new FormData()
        formData.set('messageId', messageId)

        files.forEach((file) => {
          formData.append('files', file)
        })

        postAttachments(formData).then(console.log).catch((err) => {
          console.error(err)
          toast('Error sending attachments', { type: 'error' })
        })
      }

      sendMessage({
        content: trimmedText,
        userId: user.data.id,
        groupId: groupId,
        messageId,
      }).catch((err) => {
        console.error(err)
        toast('Could not send message', { type: 'error' })
      })
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
