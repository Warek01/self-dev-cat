import { FC, memo } from 'react'

const ChatMessageAreaEmpty: FC = () => {
  return (
    <main className="flex flex-1 items-center justify-center text-2xl">
      Open a chat
    </main>
  )
}

export default memo(ChatMessageAreaEmpty)
