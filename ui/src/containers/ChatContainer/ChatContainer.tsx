import { FC, memo, PropsWithChildren, useEffect } from 'react'

import { useGetCurrentUserQuery, useGetMessageGroupsQuery } from '@apis'
import { ChatWsEvent } from '@ws/enums/ChatWsEvent'
import { chatSocket } from '@ws/sockets/chatSocket'

export const ChatContainer: FC<PropsWithChildren> = memo(({ children }) => {
  const user = useGetCurrentUserQuery()
  const groups = useGetMessageGroupsQuery({ skip: 0, limit: 100 })

  useEffect(() => {
    if (!user.data || !groups.data) {
      return
    }

    chatSocket.emit(ChatWsEvent.JOIN_ROOMS, {
      userId: user.data.id,
      groupIds: (groups.data?.items || []).map((group) => group.id),
    })
  }, [user, groups])

  return children
})
