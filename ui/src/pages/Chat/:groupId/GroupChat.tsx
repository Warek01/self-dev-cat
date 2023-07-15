import {
  FC,
  memo,
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
} from 'react'
import { useParams } from 'react-router-dom'

import { ChatContext } from '../../../containers/ChatContainer/ChatContainer.context.ts'
import { Button, TextInput } from '../../../components'
import { useAppSelector } from '../../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../../lib/slices/currentUser/currentUser.slice.ts'

const GroupChatPage: FC = () => {
  const params = useParams()
  const { sendMessage, requestMessages } = useContext(ChatContext)
  const { user } = useAppSelector(selectCurrentUser)

  const textInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const handleSendMessage = useCallback(async () => {
    if (!textInputRef.current || !user) {
      return
    }

    const content: string = textInputRef.current.value
    textInputRef.current.value = ''

    await sendMessage({
      content,
      userId: user.id,
      groupId: parseInt(params['groupId']!),
    })
  }, [user])

  return (
    <main>
      <TextInput name="send-message" autoComplete={false} ref={textInputRef} />
      <Button text="Send" onClick={handleSendMessage} />
    </main>
  )
}

export default memo(GroupChatPage)
