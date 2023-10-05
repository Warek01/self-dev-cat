import { FC, memo, ReactElement, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { FriendRequest } from '@/types/FriendRequest'
import { cl, mapRouteParams } from '@helpers'
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

import type { UserCardProps } from './UserCard.types'

export const UserCard: FC<UserCardProps> = memo((props) => {
  const { user, className, isFriend = false } = props
  const currentUser: User | null = useAppSelector(selectAuthenticatedUser)
  const [friendStatusElement, setFriendStatusElement] =
    useState<ReactElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const computeFriendStatus = useCallback(async () => {
    setIsLoading(true)
    const isFriendRequestSent: boolean = !!sentFriendRequests.data?.items.find(
      (req) => req.to?.id === user.id,
    )

    const friendRequestFromUser: FriendRequest | null =
      friendRequests.data?.items.find((req) => req.from?.id === user.id) ?? null

    if (isFriendRequestSent) {
      setFriendStatusElement(<div>Friend request sent</div>)
    }

    if (friendRequestFromUser) {
      setFriendStatusElement(
        <FriendRequestButtons requestId={friendRequestFromUser.id} />,
      )
    }

    setIsLoading(false)
    setFriendStatusElement(
      <Button
        text="Send friend request"
        onClick={() => sendFriendRequest(user.id)}
      />,
    )
  }, [user, sentFriendRequests, friendRequests])

  useEffect(() => {
    if (isFriend) {
      return
    }

    computeFriendStatus()
  }, [user, isFriend])

  if (currentUser?.id === user.id) {
    return null
  }

  if (isLoading) {
    return <LoadingSpinner size={32} />
  }

  return (
    <main className={cl('flex flex-1', className)}>
      <Link to={mapRouteParams(AppRoute.USER, { username: user.username })}>
        {user.username}
      </Link>
      {friendStatusElement}
    </main>
  )
})
