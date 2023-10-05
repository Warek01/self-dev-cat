import {
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import icons from '@icons'
import { ChatWsEvent } from '@constants/ws/enums/ChatWsEvent'
import { chatSocket } from '@constants/ws/sockets/chatSocket'
import { ChatMessage } from '@components/chat'
import { useAppSelector, useDragScroll, useOnWindowClick } from '@hooks'
import { useGetMessagesQuery } from '@redux/chat.api'
import type { User } from '@/types/User'
import { selectAuthenticatedUser } from '@redux/auth.slice'

import type { ChatMessagesAreaProps } from './ChatMessagesArea.types'

export const ChatMessagesArea: FC<ChatMessagesAreaProps> = memo(
  ({ groupId }) => {
    const user: User | null = useAppSelector(selectAuthenticatedUser)
    const messageListRef = useRef<HTMLElement>(null!)
    const [popoverOverMessageId, setPopoverOverMessageId] = useState<
      string | null
    >(null)

    const messages = useGetMessagesQuery({
      groupId,
      skip: 0,
      limit: 100,
    })

    const handleDeleteMessage = useCallback(async () => {}, [])

    useEffect(() => {
      messageListRef.current?.scrollTo({
        top: messageListRef.current?.scrollHeight,
        behavior: 'instant',
      })
    }, [messages])

    useOnWindowClick(() => {
      setPopoverOverMessageId(null)
    })

    const memorizedMessages: ReactElement[] = useMemo(
      () =>
        (messages.data?.items || [])
          .filter((message) => message.content || message.attachments?.length)
          .map((message) => (
            <ChatMessage
              onDelete={handleDeleteMessage}
              openPopover={() => setPopoverOverMessageId(message.id)}
              closePopover={() => setPopoverOverMessageId(null)}
              isPopoverOpen={popoverOverMessageId === message.id}
              key={message.id}
              message={message}
              fromCurrentUser={message.user.id === user?.id}
            />
          )),
      [messages, user, popoverOverMessageId],
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
        id="chat-message-area"
        className="flex-1 max-h-full flex overflow-auto"
        ref={(current) => {
          dragRef.current = current!
          messageListRef.current = current!
        }}
        onScrollCapture={() => setPopoverOverMessageId(null)}
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
