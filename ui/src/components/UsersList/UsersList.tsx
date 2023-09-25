import { FC, memo } from 'react'

import { UsersListUser } from '@/components'

import type { UsersListProps } from './UsersList.types'

export const UsersList: FC<UsersListProps> = memo(({ users }) => {
  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => (
        <li key={user.id}>
          <UsersListUser user={user} />
        </li>
      ))}
    </ul>
  )
})
