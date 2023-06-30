import { Outlet, RouteObject } from 'react-router-dom';

import App from '../../../App.tsx'
import HomePage from '../../../pages/Home/HomePage.tsx'
import LoginPage from '../../../pages/Login/LoginPage.tsx'
import NotFoundPage from '../../../pages/NotFound/NotFoundPage.tsx'
import RegisterPage from '../../../pages/Register/RegisterPage.tsx'
import FriendRequestsPage from '../../../pages/Users/:username/FriendRequests/FriendRequestsPage.tsx'
import UserPage from '../../../pages/Users/:username/UserPage.tsx'
import { AuthPrivateRoute } from '../../../protected-routes'
import { AppRoute } from '../../enums/AppRoute.ts'

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
        path: AppRoute.USER,
        element: <AuthPrivateRoute component={() => <Outlet />} />,
        children: [
          {
            path: AppRoute.USER_PROFILE,
            element: <AuthPrivateRoute component={UserPage} />,
          },
          {
            path: AppRoute.USER_FRIEND_REQUESTS,
            element: <AuthPrivateRoute component={FriendRequestsPage} />,
          },
        ],
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
      {
        path: AppRoute.ANY,
        element: <NotFoundPage />,
      },
    ],
  },
]
