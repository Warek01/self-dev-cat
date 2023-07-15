import { FC, memo, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ChatContext } from '../../containers/ChatContainer/ChatContainer.context.ts'
import type { ApiFindResponse } from '../../lib/types/Api.ts'
import type { MessageGroup } from '../../lib/types/MessageGroup.ts'
import { Button } from '../index.ts'

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

  // TODO: implement resize
  return (
    <main className="flex flex-1 max-w-[20%] pr-4 border-r border-black dark:border-dark-white">
      <ul className="flex flex-1 flex-col justify-start gap-4">
        {messageGroups.map((group) => (
          <Button type="link" to={group.id.toString()} text={group.name} />
        ))}
      </ul>
    </main>
  )
}

export default memo(ChatSelect)
