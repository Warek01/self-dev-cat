import { FC, memo } from 'react'
import { useParams } from 'react-router-dom'

const UserPage: FC = () => {
  const params = useParams()
  const userId: string = params['userId']!

  return <main>User {userId} page</main>
}

export default memo(UserPage)
