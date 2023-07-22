import {
  FC,
  memo,
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import type { ChatMessagesAreaProps } from './ChatMessagesArea.types'
import { ChatMessage } from '../index'
import { useAppSelector } from '../../../lib/hooks/useAppSelector'
import { selectCurrentUser } from '../../../lib/slices/currentUser/currentUser.slice'
import { useDragScroll } from '../../../lib/hooks/useDragScroll'

const ChatMessagesArea: FC<ChatMessagesAreaProps> = ({ messages }) => {
  const messageListRef: MutableRefObject<HTMLElement> = useRef(
    {} as HTMLElement,
  )
  const { user } = useAppSelector(selectCurrentUser)

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: 'instant',
    })
  }, [messages])

  const memorizedMessages: ReactElement[] = useMemo(
    () =>
      messages.map((message, index) => (
        <ChatMessage
          message={message}
          fromCurrentUser={message.user.id === user?.id}
        />
      )),
    [messages, user],
  )
  const dragRef = useDragScroll<HTMLElement>({
    disabled: false,
    withGrabCursor: false,
    withGrabbingCursor: true,
  })

  return (
    <main
      className="flex-1 max-h-full flex overflow-auto"
      ref={(current) => {
        dragRef.current = current!
        messageListRef.current = current!
      }}
    >
      <ul className="flex gap-1 p-3 h-fit w-full flex-col-reverse justify-start overflow-auto">
        {memorizedMessages}
      </ul>
    </main>
  )
}

export default memo(ChatMessagesArea)
