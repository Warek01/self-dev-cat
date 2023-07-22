import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../../../lib/hooks/useAppSelector'
import { selectCurrentUser } from '../../../../lib/slices/currentUser/currentUser.slice'

const FriendRequestsPage: FC = () => {
  const params = useParams()
  const username = params['username']!
  const currentUser = useAppSelector(selectCurrentUser)
  const isCurrentUser = username === currentUser.user?.username

  return <main>{username}'s friend requests</main>
}

export default memo(FriendRequestsPage)
