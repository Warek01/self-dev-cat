import { FC, memo } from 'react'
import { FriendRequestsList } from '@components'

const FriendRequestsPage: FC = () => {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-3xl text-heading-green font-medium">Friend requests</h1>
      <FriendRequestsList />
    </main>
  )
}

export default memo(FriendRequestsPage)
