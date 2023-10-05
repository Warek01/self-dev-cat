import { FC, memo } from 'react'
import { PageHeader } from '@components'
import { FriendsList } from '@components/FriendsList/FriendsList'

const FriendsPage: FC = () => {
  return (
    <main>
      <PageHeader text="Friends" />
      <FriendsList />
    </main>
  )
}

export default memo(FriendsPage)
