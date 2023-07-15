import {
  FC,
  memo,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppSelector } from '../../lib/hooks/useAppSelector.ts'
import * as currentUserSlice from '../../lib/slices/currentUser/currentUser.slice.ts'
import { Button, TextInput } from '../index.ts'
import icons from '../../icons'
import { ChatContext } from '../../containers/ChatContainer/ChatContainer.context.ts'
import type { Message } from '../../lib/types/Message.ts'
import { messageGroupClient } from '../../lib/clients/messageGroup.client.ts'
import { MessageGroup } from '../../lib/types/MessageGroup.ts'
import { useLocalStorage } from '../../lib/hooks/useLocalStorage.ts'
import { usePreviousValue } from '../../lib/hooks/usePreviousValue.ts'
import { ApiFindResponse } from '../../lib/types/Api.ts'

const ChatMessageArea: FC = () => {
  const params = useParams()
  const groupId: number = parseInt(params['groupId']!)
  const prevGroupId: number = usePreviousValue(groupId)

  const { user, accessToken } = useAppSelector(
    currentUserSlice.selectCurrentUser,
  )
  const { sendMessage, requestMessages } = useContext(ChatContext)
  const messageTextInputRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useLocalStorage<Message[]>(
    `message_group_${groupId}_messages`,
    [],
  )
  const [currentGroup, setCurrentGroup] = useLocalStorage<MessageGroup | null>(
    `message_group_${groupId}`,
    null,
  )

  const handleMessageSend = useCallback(async () => {
    if (!messageTextInputRef.current || !user) {
      return
    }

    try {
      const content: string = messageTextInputRef.current.value
      messageTextInputRef.current.value = ''

      await sendMessage({
        content,
        userId: user.id,
        groupId: groupId,
      })

      const newMessage: Message = {
        content,
        userId: user.id,
      }

      setMessages((messages) => [...messages, newMessage])
    } catch (err: unknown) {
      console.error(err)
      toast('Could not send message', { type: 'error' })
    }
  }, [sendMessage, user, accessToken])

  useEffect(() => {
    if (groupId === prevGroupId) {
      return
    }

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
          25,
        )

        console.log(groupMessages)

        setMessages(groupMessages.items)
      } catch (err: unknown) {
        console.error(err)
        toast('Could not load messages', { type: 'error' })
      }
    })()


  }, [groupId])

  return (
    <div>
      <header>{currentGroup ? <>{currentGroup.name}</> : <></>}</header>

      <main></main>

      <div className="flex justify-between items-center p-3 rouned-full border border-black dark:border-dark-white">
        <TextInput name="message-text-input" ref={messageTextInputRef} />
        <div>
          <Button
            Icon={icons.Send}
            onClick={handleMessageSend}
            circle
            iconSize={32}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(ChatMessageArea)
