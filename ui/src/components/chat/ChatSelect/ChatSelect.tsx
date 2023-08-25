import { FC, memo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetMessageGroupsQuery } from '@apis'
import icons from '@icons'
import { Button, ModalWindow } from '@components'
import { ChatCreateModal } from '@components/chat'

export const ChatSelect: FC = memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const groupId = params['groupId']

  const messageGroups = useGetMessageGroupsQuery({
    skip: 0,
    limit: 100,
  })

  const [createModalOpened, setCreateModalOpened] = useState<boolean>(false)

  return (
    <>
      {createModalOpened && (
        <ModalWindow onClose={() => setCreateModalOpened(false)}>
          <ChatCreateModal onClose={() => setCreateModalOpened(false)} />
        </ModalWindow>
      )}

      <main className="flex relative pr-4 border-r border-black/10 dark:border-dark-white/10 duration-0">
        <ul className="flex flex-1 flex-col justify-start gap-4">
          <Button
            onClick={() => setCreateModalOpened(true)}
            className="py-6"
            text="Create new group"
            iconPosition="left"
            Icon={icons.Add}
            iconSize={24}
          />
          {(messageGroups.data?.items || []).map((group) => (
            <Button
              active={groupId === group.id}
              onClick={() => navigate(group.id.toString())}
              key={group.id}
              text={group.name || 'Unnamed'}
              className="py-6"
            />
          ))}
        </ul>

        <div className="absolute top-0 right-0 h-full w-1" />
      </main>
    </>
  )
})
