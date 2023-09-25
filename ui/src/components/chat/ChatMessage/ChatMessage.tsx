import { FC, memo, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  useFloating,
  useInteractions,
  autoUpdate,
  useFocus,
  useDismiss,
  useRole,
  FloatingFocusManager,
} from '@floating-ui/react'

import { ChatMessageAttachment } from '@components/chat'
import icons from '@icons'
import { Button } from '@components/input'

import type { ChatMessageProps } from './ChatMessage.types'
import { useOnClickOutside } from '@hooks'

export const ChatMessage: FC<ChatMessageProps> = memo((props) => {
  const {
    message,
    onDelete,
    fromCurrentUser,
    isPopoverOpen,
    closePopover,
    openPopover,
  } = props
  const hasAttachments: boolean = !!message.attachments?.length

  // Popover logic
  const [popoverDisabled, setPopoverDisabled] = useState<boolean>(false)
  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: isPopoverOpen,
    onOpenChange: (open) => (open ? openPopover : closePopover),
    whileElementsMounted: autoUpdate,
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    role,
  ])

  const clickOutSideRef = useOnClickOutside(() => closePopover())

  const observer: IntersectionObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          setPopoverDisabled(!entries[0].isIntersecting)
        },
        { threshold: 0.95, root: document.getElementById('chat-message-area') },
      ),
    [],
  )

  return message.content || hasAttachments ? (
    <main
      className={twMerge(
        'flex w-full overflow-hidden',
        fromCurrentUser ? 'justify-end' : 'justify-start',
      )}
      ref={(instance) => {
        instance && observer.observe(instance)
      }}
    >
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onContextMenu: (e) => {
            if (popoverDisabled) {
              return
            }

            e.preventDefault()
            openPopover()
          },
        })}
        className={twMerge(
          'relative py-1.5 px-4 rounded-3xl flex flex-col w-fit max-w-[66.666%] lg:max-w-[40%]',
          fromCurrentUser
            ? 'bg-heading-green rounded-br-none'
            : 'bg-black/10 dark:bg-dark-white/10 rounded-bl-none',
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

      {/* Popover element */}
      {isPopoverOpen && (
        <FloatingFocusManager context={context}>
          <div
            ref={(instance) => {
              clickOutSideRef.current = instance!
              refs.setFloating(instance)
            }}
            style={floatingStyles}
            className="dark:bg-dark-black z-50 transition-none bg-white rounded-full -mt-1"
            {...getFloatingProps({
              // Don't drag the message area
              onMouseMoveCapture: (e) => e.stopPropagation(),
            })}
          >
            <div className="dark:bg-dark-white/10 bg-black/10 p-2.5 lg:p-1.5 shadow-xl rounded-full flex gap-6 md:gap-3 lg:gap-1.5">
              <Button
                circle
                Icon={icons.Close}
                onClick={() => closePopover()}
                iconClassName="w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4"
                className="p-4 md:p-2.5 lg:p-1.5"
              />
              <Button
                circle
                Icon={icons.Clipboard}
                disabled={!message.content}
                onClick={() => navigator?.clipboard.writeText(message.content!)}
                iconClassName="w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4"
                className="p-4 md:p-2.5 lg:p-1.5"
              />
              <Button
                circle
                Icon={icons.Copy}
                /* TODO: implement clone message */
                disabled={true}
                iconClassName="w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4"
                className="p-4 md:p-2.5 lg:p-1.5"
              />
              <Button
                circle
                Icon={icons.Delete}
                onClick={() => onDelete}
                iconClassName="w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4"
                className="p-4 md:p-2.5 lg:p-1.5"
              />
              <Button
                circle
                Icon={icons.Pen}
                /* TODO: implement edit message */
                disabled={true}
                iconClassName="w-8 h-8 md:w-6 md:h-6 lg:w-4 lg:h-4"
                className="p-4 md:p-2.5 lg:p-1.5"
              />
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </main>
  ) : null
})
