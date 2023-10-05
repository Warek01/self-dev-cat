import { FC, memo } from 'react'

import { useGetFriendsQuery } from '@redux/user.api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { LoadingSpinner } from '@components/utility'
import { UsersList } from '@components'
import type { User } from '@/types/User'

export const FriendsList: FC = memo(() => {
  const user: User | null = useAppSelector(selectAuthenticatedUser)
  const dispatch = useAppDispatch()

  const friends = useGetFriendsQuery(user?.id!, {
    skip: !user?.id,
  })

  const isLoading: boolean = friends.isLoading

  if (isLoading) {
    return <LoadingSpinner size={32} />
  }

  return (
    <main>
      <UsersList users={friends.data?.items ?? []} isFriendsList={true} />
    </main>
  )
})
