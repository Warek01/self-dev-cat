import { FC, useContext, useEffect, useState } from 'react'

import { ChatContext } from '../../containers/ChatContainer/ChatContainer.context.ts'
import type { ApiFindResponse } from '../../lib/types/Api.ts'
import type { MessageGroup } from '../../lib/types/MessageGroup.ts'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../lib/enums/AppRoute.ts'
import { toast } from 'react-toastify'

const ChatSelect: FC = () => {
  const { requestMessageGroups } = useContext(ChatContext)
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const req: ApiFindResponse<MessageGroup> = await requestMessageGroups(
          0,
          25,
        )

        setMessageGroups(req.items)
      } catch (err) {
        console.error(err)
        toast('Failed to load chats', { type: 'error' })
      }
    })()
  }, [])

  return (
    <main>
      {messageGroups.map((group) => (
        <Link to={group.id.toString()}>{group.name}</Link>
      ))}
    </main>
  )
}

export default ChatSelect
