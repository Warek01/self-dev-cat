import {
  FC,
  memo,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'

import { ChatContext } from '../../../containers/ChatContainer/ChatContainer.context.ts'
import { Button, TextInput } from '../../../components'
import { useAppSelector } from '../../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../../lib/slices/currentUser/currentUser.slice.ts'
import { ApiFindResponse } from '../../../lib/types/Api.ts'
import { Message } from '../../../lib/types/Message.ts'
import { toast } from 'react-toastify'

const GroupChatPage: FC = () => {
  const params = useParams()
  const { sendMessage, requestMessages } = useContext(ChatContext)
  const { user } = useAppSelector(selectCurrentUser)

  const textInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const handleSendMessage = useCallback(async () => {
    if (!textInputRef.current || !user) {
      return
    }

    try {
      const content: string = textInputRef.current.value
      textInputRef.current.value = ''

      await sendMessage({
        content,
        userId: user.id,
        groupId: parseInt(params['groupId']!),
      })
    } catch (err) {
      console.error(err)
      toast('Failed to send message', { type: 'error' })
    }
  }, [user])

  useEffect(() => {
    ;(async () => {
      try {
        const messages: ApiFindResponse<Message> = await requestMessages(
          parseInt(params['groupId']!),
          0,
          25,
        )
        console.log(messages)
      } catch (err) {
        console.error(err)
        toast('Error loading messages', { type: 'error' })
      }
    })()
  }, [])

  return (
    <main>
      <TextInput name="send-message" autoComplete={false} ref={textInputRef} />
      <Button text="Send" onClick={handleSendMessage} />
    </main>
  )
}

export default memo(GroupChatPage)
