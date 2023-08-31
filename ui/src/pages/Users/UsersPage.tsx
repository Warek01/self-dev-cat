import { FC, memo } from 'react'

import icons from '@icons'
import { useGetUsersQuery } from '@apis'
import { UsersList } from '@components'

const UsersPage: FC = () => {
  const users = useGetUsersQuery({ limit: 100 })

  return (
    <main>
      {users.isLoading ? (
        <div className="flex justify-center py-32">
          <icons.Spinner
            width={32}
            height={32}
            className="transform-gpu animate-spin"
          />
        </div>
      ) : (
        <UsersList users={users.data!.items} />
      )}
    </main>
  )
}

export default memo(UsersPage)
