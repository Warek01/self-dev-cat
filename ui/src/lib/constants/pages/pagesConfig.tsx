import { RouteObject } from 'react-router-dom'

import App from '../../../App.tsx'
import HomePage from '../../../pages/Home/HomePage.tsx'
import LoginPage from '../../../pages/Login/LoginPage.tsx'
import RegisterPage from '../../../pages/Register/RegisterPage.tsx'
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
        element: <AuthPrivateRoute component={HomePage} />,
      },
      {
        path: AppRoute.USERS,
        // TODO: add Users component
        element: <AuthPrivateRoute component={() => 'Users'} />,
        children: [],
      },
      {
        path: AppRoute.LOGIN,
        element: (
          <AuthPrivateRoute inverse to={AppRoute.HOME} component={LoginPage} />
        ),
      },
      {
        path: AppRoute.REGISTER,
        element: (
          <AuthPrivateRoute
            inverse
            to={AppRoute.HOME}
            component={RegisterPage}
          />
        ),
      },
    ],
  },
]
