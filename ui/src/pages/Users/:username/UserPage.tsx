import { FC } from 'react'
import { useParams } from 'react-router-dom'

const UserPage: FC = () => {
  const params = useParams()
  const username = params['username']!

  return <main>{username}</main>
}

export default UserPage
