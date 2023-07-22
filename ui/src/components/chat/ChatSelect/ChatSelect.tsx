import {
  FC,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ChatContext } from '@containers/ChatContainer/ChatContainer.context'
import icons from '@icons'
import { Button } from '@components'
import { ChatCreateModal } from '../ChatCreateModal/ChatCreateModal'

export const ChatSelect: FC = memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { requestMessageGroups, messageGroups } = useContext(ChatContext)
  const groupId: number | null = params['groupId']
    ? parseInt(params['groupId'])
    : null

  const [openedModal, setOpenedModal] = useState<ReactElement | null>(null)

  const openChatModal = useCallback(() => {
    setOpenedModal(<ChatCreateModal onClose={() => setOpenedModal(null)} />)
  }, [])

  useEffect(() => {
    requestMessageGroups(0, 100)
  }, [])

  // TODO: implement resize
  return (
    <>
      {openedModal}
      <main className="flex flex-1 max-w-[20%] pr-4 border-r border-black/10 dark:border-dark-white/10">
        <ul className="flex flex-1 flex-col justify-start gap-4">
          <Button
            onClick={openChatModal}
            className="py-6"
            text="Create new group"
            iconPosition="left"
            Icon={icons.Add}
            iconSize={24}
          />
          {messageGroups.map((group) => (
            <Button
              active={groupId === group.id}
              onClick={() => navigate(group.id.toString())}
              key={group.id}
              text={group.name || 'Unnamed'}
              className="py-6"
            />
          ))}
        </ul>
      </main>
    </>
  )
})
