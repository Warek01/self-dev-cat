import { FC, memo } from 'react'

import icons from '@icons'
import { FriendRequest } from '@components/FriendRequest/FriendRequest'
import { useGetFriendRequestsQuery } from '@redux/user.api'
import { H } from '@/components'

export const FriendRequestsList: FC = memo(() => {
  const friendRequests = useGetFriendRequestsQuery({
    limit: 100,
    skip: 0,
    outgoing: false,
  })

  return (
    <main>
      {friendRequests.isLoading ? (
        <div className="flex justify-center py-32">
          <icons.Spinner width={48} height={48} className="animate-spin" />
        </div>
      ) : friendRequests.data?.count ? (
        <ul>
          {friendRequests.data?.items?.map((friendRequest) => (
            <li key={friendRequest.id}>
              <FriendRequest request={friendRequest} />
            </li>
          ))}
        </ul>
      ) : (
        <H type={4} className="py-3">
          No friend requests
        </H>
      )}
    </main>
  )
})
