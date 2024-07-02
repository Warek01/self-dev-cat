import { FC, memo, ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { cn, mapRouteParams } from '@helpers'
import { AppRoute } from '@enums'
import { useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { useSendFriendRequestMutation } from '@redux/user.api'
import { FriendRequestButtons } from '@/components'
import { Button } from '@components/input'
import type { AuthenticatedUser } from '@/types/Auth'
import { FriendStatus } from '@enums/friend-status'

import type { UserCardProps } from './UserCard.types'

export const UserCard: FC<UserCardProps> = memo((props) => {
  const { user, className, isFriend = false } = props
  const currentUser: AuthenticatedUser | null = useAppSelector(
    selectAuthenticatedUser,
  )
  const [friendStatusElement, setFriendStatusElement] =
    useState<ReactElement | null>(null)

  const [sendFriendRequest] = useSendFriendRequestMutation()

  useEffect(() => {
    if (isFriend) {
      return
    }

    console.log(user.username)
    switch (user.friendStatus) {
      case FriendStatus.SENT_TO:
        setFriendStatusElement(<div>Friend request sent</div>)
        break
      case FriendStatus.SENT_FROM:
        setFriendStatusElement(<FriendRequestButtons userId={user.id} />)
        break
      case FriendStatus.FRIEND:
        setFriendStatusElement(<div>Friend</div>)
        break
      case FriendStatus.NONE:
        setFriendStatusElement(
          <Button
            text="Send friend request"
            onClick={() => sendFriendRequest(user.id)}
          />,
        )
    }
  }, [user, isFriend])

  if (currentUser?.id === user.id) {
    return null
  }

  return (
    <main className={cn('flex flex-1 items-center justify-start gap-3', className)}>
      <Link to={mapRouteParams(AppRoute.USER, { username: user.username })}>
        {user.username}
      </Link>
      {friendStatusElement}
    </main>
  )
})
