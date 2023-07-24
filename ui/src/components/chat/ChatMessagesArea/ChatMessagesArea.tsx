import icons from '@icons'
import { ChatWsEvent } from '@ws/enums/ChatWsEvent'
import { chatSocket } from '@ws/sockets/chatSocket'
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
import { useDragScroll } from '@hooks'
import {
  useGetCurrentUserQuery,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
} from '@apis'
import type { ChatMessagesAreaProps } from './ChatMessagesArea.types'

export const ChatMessagesArea: FC<ChatMessagesAreaProps> = memo(
  ({ groupId }) => {
    const messageListRef: MutableRefObject<HTMLElement> = useRef(
      {} as HTMLElement,
    )
    const user = useGetCurrentUserQuery()
    const messages = useGetMessagesQuery({
      groupId,
      skip: 0,
      limit: 100,
    })

    useEffect(() => {
      messageListRef.current?.scrollTo({
        top: messageListRef.current?.scrollHeight,
        behavior: 'instant',
      })
    }, [messages])

    const memorizedMessages: ReactElement[] = useMemo(
      () =>
        (messages.data?.items || []).map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            fromCurrentUser={message.user.id === user.data?.id}
          />
        )),
      [messages, user],
    )
    const dragRef = useDragScroll<HTMLElement>({
      disabled: false,
      withGrabCursor: false,
      withGrabbingCursor: true,
    })

    useEffect(() => {
      chatSocket.on(ChatWsEvent.DELETE_ALL_MESSAGES, (dto) => {
        messages.refetch()
      })
    }, [])

    return (
      <main
        className="flex-1 max-h-full flex overflow-auto"
        ref={(current) => {
          dragRef.current = current!
          messageListRef.current = current!
        }}
      >
        {messages.isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <icons.Spinner width={32} height={32} className="animate-spin" />
          </div>
        ) : (
          <ul className="flex min-h-full gap-1 p-3 h-fit w-full flex-col-reverse items-start justify-start overflow-auto">
            {memorizedMessages}
          </ul>
        )}
      </main>
    )
  },
)
