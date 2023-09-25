import { FC, memo, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'

import icons from '@icons'
import { convertSize, localStorageHelper } from '@helpers'

import type { ChatMessageAttachmentProps } from './ChatMessageAttachment.types'
import { attachmentIconMap } from './ChatMessageAttachment.constants'

export const ChatMessageAttachment: FC<ChatMessageAttachmentProps> = memo(
  ({ attachment }) => {
    const ref = useRef<HTMLAnchorElement>({} as HTMLAnchorElement)

    const Icon =
      attachmentIconMap[
        Object.keys(attachmentIconMap).find((icon) =>
          attachment.mime.startsWith(icon),
        ) ?? 'unknown'
      ]

    const requestAttachment = useCallback(async () => {
      const req = await fetch(
        `${import.meta.env.VITE_API_URL}/attachment/get/${attachment.id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorageHelper.accessToken}`,
            'Content-Type': attachment.mime,
          },
        },
      )

      if (!req.ok) {
        toast('Error downloading attachment', { type: 'error' })
        return
      }

      const blob = await req.blob()
      const url = URL.createObjectURL(blob)

      ref.current.href = url
      ref.current.click()

      URL.revokeObjectURL(url)
    }, [attachment])

    return (
      <div
        className="custom w-full flex justify-between rounded-lg bg-black/10 hover:bg-black/20 dark:bg-dark-black/10 hover:dark:bg-dark-black/20
        text-white items-center px-2 py-1 gap-1.5 lg:gap-3"
      >
        <div className="flex flex-col gap-0.5 items-start">
          <Icon width={24} height={24} className="" />
          <p className="text-[9px]">{convertSize(attachment.size)}</p>
        </div>
        <p className="flex-1 px-3 lg:px-6 text-ellipsis whitespace-nowrap overflow-hidden">
          {attachment.name}
        </p>
        <icons.Download
          width={24}
          height={24}
          className="cursor-pointer dark:hover:bg-black/15 hover:bg-white/15 p-2 box-content rounded-full"
          onClick={requestAttachment}
        />
        <a className="hidden" ref={ref} download={attachment.name} />
      </div>
    )
  },
)
