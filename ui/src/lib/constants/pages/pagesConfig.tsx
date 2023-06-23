import { RouteObject } from 'react-router-dom'

import LoginForm from '../../../forms/LoginForm/LoginForm.tsx'
import { Home } from '../../../pages'
import { AuthPrivateRoute } from '../../../protected-routes'
import { AppRoute } from '../enums/AppRoute.ts'

export const pagesConfig: RouteObject[] = [
  {
    path: AppRoute.HOME,
    element: <Home />,
  },
  {
    path: AppRoute.USERS,
    element: <AuthPrivateRoute component={() => 'Users'} />,
  },
  {
    path: AppRoute.LOGIN,
    element: <AuthPrivateRoute inverse component={LoginForm} />,
  },
]
