import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { ChatContainer } from '../../containers'

const ChatPage: FC = () => {
  return (
    <ChatContainer>
      <Outlet />
    </ChatContainer>
  )
}

export default memo(ChatPage)
