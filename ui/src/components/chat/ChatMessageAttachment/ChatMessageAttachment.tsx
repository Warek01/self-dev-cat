import { FC, memo } from 'react'

import type { ChatMessageAttachmentProps } from './ChatMessageAttachment.types'
import { mapRouteParams } from '@helpers'
import icons from '@icons'
import { AppRoute } from '@enums'

// TODO: implement different icons for mimes
export const ChatMessageAttachment: FC<ChatMessageAttachmentProps> = memo(
  ({ attachment }) => {
    return (
      <a
        download={attachment.name}
        href={mapRouteParams(AppRoute.ATTACHMENT, { id: attachment.id })}
        className="custom w-full flex justify-between rounded-lg bg-black/10 hover:bg-black/20 dark:bg-dark-black/10 hover:dark:bg-dark-black/20
        text-white py-3 px-4 gap-1.5 lg:gap-3"
      >
        <icons.File width={24} height={24} className="" />
        <p className="flex-1 px-3 lg:px-6 text-ellipsis whitespace-nowrap overflow-hidden">{attachment.name}</p>
        <icons.Download width={24} height={24} className="" />
      </a>
    )
  },
)
