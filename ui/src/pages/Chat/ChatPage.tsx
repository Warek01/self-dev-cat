import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { ChatContainer } from '@containers'
import { ChatSelect } from '@components/chat'

const ChatPage: FC = () => {
  return (
    <ChatContainer>
      <main className="flex flex-1 max-h-full overflow-hidden">
        <ChatSelect />
        <Outlet />
      </main>
    </ChatContainer>
  )
}

export default memo(ChatPage)
