import { FC, memo } from 'react'

import { UserCard } from '@/components'

import type { UsersListProps } from './UsersList.types'

export const UsersList: FC<UsersListProps> = memo((props) => {
  const { users, isFriendsList = false } = props

  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} isFriend={isFriendsList} />
        </li>
      ))}
    </ul>
  )
})
