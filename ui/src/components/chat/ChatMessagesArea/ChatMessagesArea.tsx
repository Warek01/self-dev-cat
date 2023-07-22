import {
  FC,
  memo,
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { ChatMessage } from '@components/chat'
import { useAppSelector, useDragScroll } from 'hooks'
import { selectCurrentUser } from '../../../slices/currentUser/currentUser.slice'
import type { ChatMessagesAreaProps } from './ChatMessagesArea.types'

export const ChatMessagesArea: FC<ChatMessagesAreaProps> = memo(
  ({ messages }) => {
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
        messages.map((message) => (
          <ChatMessage
            key={message.id}
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
        <ul className="flex min-h-full gap-1 p-3 h-fit w-full flex-col-reverse items-start justify-start overflow-auto">
          {memorizedMessages}
        </ul>
      </main>
    )
  },
)
