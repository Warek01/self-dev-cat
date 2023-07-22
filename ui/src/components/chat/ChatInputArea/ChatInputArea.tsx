import {
  FC,
  FormEventHandler,
  memo,
  RefObject,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'

import { Button, Chip, TextInput } from '../../../components'
import icons from '../../../icons'
import type { ChatInputAreaProps } from './ChatInputArea.types'

const ChatInputArea: FC<ChatInputAreaProps> = ({ onSendMessage }) => {
  const fileInputId = useId()
  const messageInputId = useId()
  const messageTextInputRef: RefObject<HTMLInputElement> = useRef(null)
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)
  const formRef: RefObject<HTMLFormElement> = useRef(null)

  const [files, setFiles] = useState<File[]>([])

  const handleMessageSend: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (!formRef.current || !messageTextInputRef.current) {
        return
      }

      await onSendMessage(messageTextInputRef.current.value, files)
      formRef.current.reset()
      setFiles([])
    },
    [onSendMessage],
  )

  const handleClickFiles = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleSelectFiles = useCallback(() => {
    if (!fileInputRef.current) {
      return
    }

    const files = fileInputRef.current.files

    setFiles(files ? Array.from(files) : [])
  }, [])

  return (
    <form
      onSubmitCapture={handleMessageSend}
      ref={formRef}
      className="flex flex-col gap-3 p-3 rouned-full border-t border-black/10 dark:border-dark-white/10"
    >
      <section className="">
        <div className="flex flex-wrap items-start justify-start gap-1">
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
        </div>
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
}

export default memo(ChatInputArea)
