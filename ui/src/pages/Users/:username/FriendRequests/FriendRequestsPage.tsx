import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../../../lib/hooks/useAppSelector.ts'
import { selectCurrentUser } from '../../../../lib/slices/currentUser/currentUser.slice.ts'

const FriendRequestsPage: FC = () => {
  const params = useParams()
  const username = params['username']!
  const currentUser = useAppSelector(selectCurrentUser)
  const isCurrentUser = username === currentUser.user?.username

  return <main>{username}'s friend requests</main>
}

export default memo(FriendRequestsPage)
