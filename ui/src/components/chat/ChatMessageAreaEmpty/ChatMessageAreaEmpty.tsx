import { FC, memo } from 'react'

export const ChatMessageAreaEmpty: FC = memo(() => {
  return (
    <main className="flex flex-1 items-center justify-center text-2xl">
      Open a chat
    </main>
  )
})
