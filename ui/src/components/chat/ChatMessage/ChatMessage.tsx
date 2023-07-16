import { forwardRef, memo } from 'react'

import type { ChatMessageProps } from './ChatMessage.types.ts'
import { twMerge } from 'tailwind-merge'

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  (props, ref) => {
    const { message, onDelete, className, fromCurrentUser } = props

    return (
      <main
        ref={ref}
        className={twMerge(
          'flex w-full overflow-hidden',
          fromCurrentUser ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          className={twMerge(
            'relative py-1 px-3 rounded-full',
            fromCurrentUser
              ? 'bg-heading-green rounded-br-none'
              : 'bg-black/10 dark:bg-dark-white/10 rounded-bl-none',
            className,
          )}
        >
          <span className="whitespace-pre-wrap break-words">
            {message.content}
          </span>
        </div>
      </main>
    )
  },
)

export default memo(ChatMessage)
