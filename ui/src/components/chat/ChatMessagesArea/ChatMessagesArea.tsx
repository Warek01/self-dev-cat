import {
  FC,
  memo,
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import type { ChatMessagesAreaProps } from './ChatMessagesArea.types.ts'
import { ChatMessage } from '../index.ts'
import { useAppSelector } from '../../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../../lib/slices/currentUser/currentUser.slice.ts'

const ChatMessagesArea: FC<ChatMessagesAreaProps> = ({ messages }) => {
  const messageListRef: RefObject<HTMLElement> = useRef(null)
  const { user } = useAppSelector(selectCurrentUser)

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: 'instant',
    })
  }, [messages])

  const memorizedMessages: ReactElement[] = useMemo(
    () =>
      messages.map((message) => (
        <ChatMessage
          message={message}
          fromCurrentUser={message.user.id === user?.id}
        />
      )),
    [messages, user],
  )

  return (
    <main className="flex-1 max-h-full flex overflow-auto" ref={messageListRef}>
      <ul className="flex gap-1 p-3 h-fit w-full flex-col-reverse justify-start overflow-auto">
        {memorizedMessages}
      </ul>
    </main>
  )
}

export default memo(ChatMessagesArea)
