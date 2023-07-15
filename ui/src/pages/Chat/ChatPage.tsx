import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'

import { ChatContainer } from '../../containers'
import { ChatSelect } from "../../components";

const ChatPage: FC = () => {
  return (
    <ChatContainer>
      <main className="flex w-screen h-screen">
        <ChatSelect />
        <Outlet />
      </main>
    </ChatContainer>
  )
}

export default memo(ChatPage)
