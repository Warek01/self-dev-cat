import { FC, memo, useMemo } from 'react'

import { useGetFriendsQuery, useGetNonFriendsQuery } from '@redux/user.api'
import { useAppDispatch, useAppSelector } from '@hooks'
import { selectAuthenticatedUser } from '@redux/auth.slice'
import { LoadingSpinner } from '@components/utility'
import { H, UsersList } from '@components'
import type { User } from '@/types/User'

export const FriendsList: FC = memo(() => {
  const user: User | null = useAppSelector(selectAuthenticatedUser)
  const dispatch = useAppDispatch()

  const friends = useGetFriendsQuery(user?.id!, {
    skip: !user?.id,
  })

  const nonFriends = useGetNonFriendsQuery({
    limit: 100,
    skip: 0,
  })

  const isLoading: boolean = friends.isLoading || nonFriends.isLoading
  const friendsList = useMemo<User[]>(
    () => friends.data?.items ?? [],
    [friends.data],
  )
  const nonFriendsList = useMemo<User[]>(
    () => nonFriends.data?.items ?? [],
    [nonFriends.data],
  )

  if (isLoading) {
    return <LoadingSpinner size={32} />
  }

  return (
    <main>
      {friendsList.length ? (
        <UsersList users={friendsList} isFriendsList={true} />
      ) : (
        <H type={4} className="py-3">
          No friends
        </H>
      )}
      <div className="flex flex-col pt-6 lg:pt-12">
        <H type={4} className="pb-3">Recommendations</H>
        {nonFriendsList.length && <UsersList users={nonFriendsList} isFriendsList={false} />}
      </div>
    </main>
  )
})
