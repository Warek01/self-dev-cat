import { FC, memo, RefObject, useEffect, useRef } from 'react'

import type { ChatMessagesAreaProps } from './ChatMessagesArea.types.ts'

const ChatMessagesArea: FC<ChatMessagesAreaProps> = ({ messages }) => {
  const messageListRef: RefObject<HTMLElement> = useRef(null)

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: 'instant',
    })
  }, [messages])

  return (
    <main className="flex-1 max-h-full flex overflow-auto" ref={messageListRef}>
      <ul className="flex h-fit flex-col-reverse justify-start overflow-auto">
        {messages.map((message, index) => (
          <li key={index} className="whitespace-pre-wrap break-words">
            {message.content}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default memo(ChatMessagesArea)
