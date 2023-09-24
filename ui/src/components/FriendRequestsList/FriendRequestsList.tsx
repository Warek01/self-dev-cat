import { FC, memo } from 'react'

import { useGetCurrentUserQuery, useGetFriendRequestsQuery } from '@apis'
import icons from '@icons'
import { FriendRequest } from '@components/FriendRequest/FriendRequest'

export const FriendRequestsList: FC = memo(() => {
  const user = useGetCurrentUserQuery()
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
        <h2 className="text-lg">No friend requests</h2>
      )}
    </main>
  )
})
