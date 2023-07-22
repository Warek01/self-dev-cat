import { FC, memo, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ChatContext } from '../../../containers/ChatContainer/ChatContainer.context'
import type { ApiFindResponse } from '../../../lib/types/Api'
import type { MessageGroup } from '../../../lib/types/MessageGroup'
import { Button } from '../../index'

const ChatSelect: FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { requestMessageGroups } = useContext(ChatContext)
  const groupId: number | null = params['groupId']
    ? parseInt(params['groupId'])
    : null

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
    <main className="flex flex-1 max-w-[20%] pr-4 border-r border-black/10 dark:border-dark-white/10">
      <ul className="flex flex-1 flex-col justify-start gap-4">
        {messageGroups.map((group) => (
          <Button
            active={groupId === group.id}
            onClick={() => navigate(group.id.toString())}
            key={group.id}
            text={group.name}
            className="py-6"
          />
        ))}
      </ul>
    </main>
  )
}

export default memo(ChatSelect)
