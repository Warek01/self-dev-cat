import { FC, memo, ReactElement, useMemo } from 'react'
import { Link } from 'react-router-dom'

import type { FriendRequest } from '@/types/FriendRequest'
import { mapRouteParams } from '@helpers'
import { AppRoute } from '@enums'

import type { User } from '@/types/User'
import { useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import {
  useGetFriendRequestsQuery,
  useSendFriendRequestMutation,
} from '@redux/user.api'
import { FriendRequestButtons } from '@/components'
import { Button } from '@components/input'
import { LoadingSpinner } from '@components/utility'

import type { UsersListUserProps } from './UsersListUser.types'

export const UsersListUser: FC<UsersListUserProps> = memo(({ user }) => {
  const currentUser: User | null = useAppSelector(selectAuthenticatedUser)
  const [sendFriendRequest] = useSendFriendRequestMutation()

  const friendRequests = useGetFriendRequestsQuery({
    limit: 100,
    skip: 0,
    outgoing: false,
  })

  const sentFriendRequests = useGetFriendRequestsQuery({
    limit: 100,
    skip: 0,
    outgoing: true,
  })

  const isFriendRequestSent = useMemo<boolean>(
    () =>
      !!sentFriendRequests.data?.items.find((req) => req.to?.id === user.id),
    [user, sentFriendRequests.data],
  )

  const friendRequestFromUser = useMemo<FriendRequest | undefined>(
    () => friendRequests.data?.items.find((req) => req.from?.id === user.id),
    [user, friendRequests.data],
  )

  const friendStatusElement = useMemo<ReactElement>(() => {
    if (isFriendRequestSent) {
      return <div>Friend request sent</div>
    }

    if (friendRequestFromUser) {
      return <FriendRequestButtons requestId={friendRequestFromUser.id} />
    }

    return (
      <Button
        text="Send friend request"
        onClick={() => sendFriendRequest(user.id)}
      />
    )
  }, [user, isFriendRequestSent, friendRequestFromUser])

  if (friendRequests.isLoading) {
    return <LoadingSpinner size={32} />
  }

  if (currentUser?.id === user.id) {
    return null
  }

  return (
    <main className="flex flex-1">
      <Link to={mapRouteParams(AppRoute.USER, { username: user.username })}>
        {user.username}
      </Link>
      {friendStatusElement}
    </main>
  )
})
