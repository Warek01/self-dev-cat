import { FC, memo, PropsWithChildren, useEffect } from 'react'

import { ChatWsEvent } from '@constants/ws/enums/ChatWsEvent'
import { chatSocket } from '@constants/ws/sockets/chatSocket'
import type { User } from '@/types/User'
import { useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { useGetMessageGroupsQuery } from '@redux/chat.api'

export const ChatContainer: FC<PropsWithChildren> = memo(({ children }) => {
  const user: User | null = useAppSelector(selectAuthenticatedUser)

  const groups = useGetMessageGroupsQuery({ skip: 0, limit: 100 })

  useEffect(() => {
    if (!user || !groups.data) {
      return
    }

    chatSocket.emit(ChatWsEvent.JOIN_ROOMS, {
      userId: user.id,
      groupIds: (groups.data?.items || []).map((group) => group.id),
    })
  }, [user, groups])

  return children
})
