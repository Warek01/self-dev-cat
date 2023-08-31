import { FC, memo } from 'react'

import {
  useAcceptFriendRequestMutation,
  useDenyFriendRequestMutation,
} from '@apis'
import { Button } from '@components'
import { FriendRequestButtonsProps } from '@components/FriendRequestButtons/FriendRequestButtons.types'

export const FriendRequestButtons: FC<FriendRequestButtonsProps> = memo(
  ({ requestId }) => {
    const [acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [denyFriendRequest] = useDenyFriendRequestMutation()

    return (
      <main className="flex gap-3">
        <Button
          onClick={() => acceptFriendRequest(requestId)}
          text="Accept"
          className="text-accept-green"
        />
        <Button
          onClick={() => denyFriendRequest(requestId)}
          text="Deny"
          className="text-error"
        />
      </main>
    )
  },
)
