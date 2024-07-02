import { FC, memo } from 'react'

import {
  useAcceptFriendRequestMutation,
  useDenyFriendRequestMutation,
} from '@redux/user.api'
import { Button } from '@components/input'

import type { FriendRequestButtonsProps } from './FriendRequestButtons.types'

export const FriendRequestButtons: FC<FriendRequestButtonsProps> = memo(
  (props) => {
    const { requestId, userId } = props

    const [acceptFriendRequest] = useAcceptFriendRequestMutation()
    const [denyFriendRequest] = useDenyFriendRequestMutation()

    return (
      <main className="flex gap-3">
        <Button
          onClick={() => acceptFriendRequest(requestId ?? userId as string)}
          text="Accept"
          className="text-accept-green"
        />
        <Button
          onClick={() => denyFriendRequest(requestId ?? userId as string)}
          text="Deny"
          className="text-error"
        />
      </main>
    )
  },
)
