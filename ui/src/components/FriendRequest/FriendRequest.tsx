import { FC, memo } from 'react'

import { FriendRequestButtons } from '@components'
import { useGetUserQuery } from '@redux/user.api'

import type { FriendRequestProps } from './FriendRequest.types'

// TODO: implement user icon
export const FriendRequest: FC<FriendRequestProps> = memo(({ request }) => {
  const fromUser = useGetUserQuery(request.from.id)

  return (
    <main className="flex flex-1 w-full lg:max-w-[50%] xl:max-w-[33.333%]">
      <div className="flex gap-3 flex-1 items-center">
        <div className="flex flex-1">
          <p className="text-lg font-medium">{fromUser.data?.username}</p>
        </div>
        <FriendRequestButtons requestId={request.id} />
      </div>
    </main>
  )
})
