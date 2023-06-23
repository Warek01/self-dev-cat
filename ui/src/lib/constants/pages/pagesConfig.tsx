import { RouteObject } from 'react-router-dom'
import App from '../../../App.tsx'

import LoginForm from '../../../forms/LoginForm/LoginForm.tsx'
import { Home } from '../../../pages'
import { AuthPrivateRoute } from '../../../protected-routes'
import { AppRoute } from '../enums/AppRoute.ts'

export const pagesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    caseSensitive: false,
    hasErrorBoundary: false,
    errorElement: null,
    ErrorBoundary: null,

    children: [
      {
        path: AppRoute.HOME,
        element: <AuthPrivateRoute component={Home} />,
      },
      {
        path: AppRoute.USERS,
        // TODO: add Users component
        element: <AuthPrivateRoute component={() => 'Users'} />,
      },
      {
        path: AppRoute.LOGIN,
        element: (
          <AuthPrivateRoute inverse to={AppRoute.HOME} component={LoginForm} />
        ),
      },
    ],
  },
]
