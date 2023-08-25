import { forwardRef, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import type { ChatMessageProps } from './ChatMessage.types'
import { ChatMessageAttachment } from '@components/chat'

export const ChatMessage = memo(
  forwardRef<HTMLDivElement, ChatMessageProps>((props, ref) => {
    const { message, onDelete, className, fromCurrentUser } = props
    const hasAttachments = !!message.attachments?.length

    return message.content || hasAttachments ? (
      <main
        ref={ref}
        className={twMerge(
          'flex w-full overflow-hidden',
          fromCurrentUser ? 'justify-end' : 'justify-start',
        )}
      >
        <div
          onMouseDownCapture={(e) => e.stopPropagation()}
          className={twMerge(
            'relative py-1.5 px-4 rounded-3xl flex flex-col w-fit max-w-[66.666%] lg:max-w-[40%]',
            fromCurrentUser
              ? 'bg-heading-green rounded-br-none'
              : 'bg-black/10 dark:bg-dark-white/10 rounded-bl-none',
            className,
          )}
        >
          {message.content && (
            <span className="whitespace-pre-wrap break-words">
              {message.content}
            </span>
          )}
          {hasAttachments && (
            <section className="flex flex-col gap-2 py-2">
              {message.attachments!.map((attachment) => (
                <ChatMessageAttachment
                  attachment={attachment}
                  key={attachment.id}
                />
              ))}
            </section>
          )}
        </div>
      </main>
    ) : null
  }),
)
