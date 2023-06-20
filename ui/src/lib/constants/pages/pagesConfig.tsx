import { RouteObject } from 'react-router-dom'
import { AuthPrivateRoute } from '../../../protected-routes'
import Test from '../../../components/Test/Test.tsx'

import { Home } from '../../../pages'
import { AppRoute } from '../enums/AppRoute.ts'

export const pagesConfig: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <Home />,
  },
  {
    path: AppRoute.USERS,
    element: (
      <AuthPrivateRoute>
        Users page
      </AuthPrivateRoute>
    ),
  },
]
