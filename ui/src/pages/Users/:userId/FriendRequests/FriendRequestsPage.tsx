import { FC, memo } from 'react'
import { FriendRequestsList, PageHeader } from '@components'

const FriendRequestsPage: FC = () => {
  return (
    <main className="flex flex-col gap-3">
      <PageHeader text="Friends requests" />
      <FriendRequestsList />
    </main>
  )
}

export default memo(FriendRequestsPage)
