import { useGetMessageGroupsQuery } from '@apis'
import { FC, memo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { OpenedModalWindow } from '@enums'
import { useAppDispatch, useAppSelector, useResize } from '@hooks'
import { openModal } from '@slices/layout/layout.slice'
import icons from '@icons'
import { Button } from '@components'

export const ChatSelect: FC = memo(() => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const isMobile = useAppSelector((state) => state.layout.isMobile)

  const [resizeRef, handleResizeRef] = useResize<HTMLElement, HTMLDivElement>({
    disabled: isMobile,
    storageKey: 'chat-select',
    onX: true,
    onY: false,
    widthVales: {
      min: 150,
      initial: 200,
      max: 600,
    },
  })

  const groupId: number | null = params['groupId']
    ? parseInt(params['groupId'])
    : null

  const messageGroups = useGetMessageGroupsQuery({
    skip: 0,
    limit: 100,
  })

  const openChatModal = useCallback(() => {
    dispatch(openModal(OpenedModalWindow.CREATE_CHAT))
  }, [])

  return (
    <main
      className="flex relative pr-4 border-r border-black/10 dark:border-dark-white/10 duration-0"
      ref={resizeRef}
    >
      <ul className="flex flex-1 flex-col justify-start gap-4">
        <Button
          onClick={openChatModal}
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

      <div
        className="absolute top-0 right-0 h-full w-1"
        ref={handleResizeRef}
      />
    </main>
  )
})
