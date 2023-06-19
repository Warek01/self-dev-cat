import { RouteObject } from 'react-router-dom'
import { AuthPrivateRoute } from '../../../components/protected-routes'
import Test from '../../../components/Test/Test.tsx'

import { Home } from '../../../pages'
import { Path } from './Path.ts'

export const pagesConfig: RouteObject[] = [
  {
    path: Path.HOME,
    element: <Home />,
  },
  {
    path: Path.USERS,
    element: (
      <AuthPrivateRoute inverse={true}>
        <Test />
      </AuthPrivateRoute>
    ),
  },
]
