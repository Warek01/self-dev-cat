import {
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'

import { Button, Chip, TextInput } from '@components'
import icons from '@icons'
import type { ChatInputAreaProps } from './ChatInputArea.types'

export const ChatInputArea: FC<ChatInputAreaProps> = memo(
  ({ onSendMessage }) => {
    const fileInputId = useId()
    const messageInputId = useId()
    const messageTextInputRef = useRef({} as HTMLInputElement)
    const fileInputRef = useRef({} as HTMLInputElement)
    const formRef = useRef({} as HTMLFormElement)

    const [files, setFiles] = useState<File[]>([])

    const handleMessageSend: FormEventHandler<HTMLFormElement> = useCallback(
      async (event) => {
        event.preventDefault()
        event.stopPropagation()

        await onSendMessage(messageTextInputRef.current.value, files)
        formRef.current.reset()
        setFiles([])
      },
      [onSendMessage, files],
    )

    const handleClickFiles = useCallback(() => {
      fileInputRef.current?.click()
    }, [])

    const handleSelectFiles = useCallback(() => {
      const files = fileInputRef.current.files
      setFiles(Array.from(files ?? []))
    }, [])

    return (
      <form
        onSubmitCapture={handleMessageSend}
        ref={formRef}
        className="flex flex-col gap-3 p-3 rouned-full border-t border-black/10 dark:border-dark-white/10"
      >
        <section className="flex flex-wrap items-start justify-start gap-1">
          {files.map((file, index) => (
            <Chip
              key={index}
              text={file.name}
              onClose={() =>
                setFiles((files) => {
                  const f = [...files]
                  f.splice(index, 1)
                  return f
                })
              }
            />
          ))}
        </section>
        <section className="flex items-center justify-between gap-3">
          <TextInput
            name={messageInputId}
            ref={messageTextInputRef}
            placeholder="Mesasge text"
            className="w-full"
          />
          <div className="flex items-center justify-end gap-4">
            <Button Icon={icons.Send} submit circle iconSize={32} />
            <Button
              Icon={icons.File}
              circle
              iconSize={32}
              onClick={handleClickFiles}
            />
          </div>
        </section>

        <input
          type="file"
          name={fileInputId}
          id={fileInputId}
          ref={fileInputRef}
          onChange={handleSelectFiles}
          multiple
          hidden
          aria-hidden
        />
      </form>
    )
  },
)
