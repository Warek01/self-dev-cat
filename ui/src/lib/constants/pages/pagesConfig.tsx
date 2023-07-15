import { Outlet, RouteObject } from 'react-router-dom'

import App from '../../../App.tsx'
import HomePage from '../../../pages/Home/HomePage.tsx'
import LoginPage from '../../../pages/Login/LoginPage.tsx'
import NotFoundPage from '../../../pages/NotFound/NotFoundPage.tsx'
import RegisterPage from '../../../pages/Register/RegisterPage.tsx'
import FriendRequestsPage from '../../../pages/Users/:username/FriendRequests/FriendRequestsPage.tsx'
import UserPage from '../../../pages/Users/:username/UserPage.tsx'
import { AuthPrivateRoute } from '../../../protected-routes'
import { AppRoute } from '../../enums/AppRoute.ts'
import ChatPage from '../../../pages/Chat/ChatPage.tsx'
import { ChatSelect } from '../../../components'
import GroupChatPage from '../../../pages/Chat/:groupId/GroupChat.tsx'
import GroupChatInfoPage from "../../../pages/Chat/:groupId/Info/GroupChatInfoPage.tsx";

export const pagesConfig: RouteObject[] = [
  {
    path: '/',
    caseSensitive: false,
    hasErrorBoundary: false,
    Component: App,
    errorElement: null,
    ErrorBoundary: null,

    children: [
      {
        index: true,
        element: <AuthPrivateRoute component={HomePage} />,
      },

      // User section
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

      // Utility section
      {
        path: AppRoute.LOGIN,
        element: (
          <AuthPrivateRoute inverse to={AppRoute.ROOT} component={LoginPage} />
        ),
      },
      {
        path: AppRoute.REGISTER,
        element: (
          <AuthPrivateRoute
            inverse
            to={AppRoute.ROOT}
            component={RegisterPage}
          />
        ),
      },

      // Chat section
      {
        path: AppRoute.CHAT,
        element: <AuthPrivateRoute component={ChatPage} />,
        children: [
          {
            index: true,
            Component: ChatSelect,
          },
          {
            path: AppRoute.CHAT_GROUP,
            Component: GroupChatPage,
          },
          {
            path: AppRoute.CHAT_GROUP_INFO,
            Component: GroupChatInfoPage,
          },
        ],
      },

      // Special section
      {
        path: AppRoute.ANY,
        element: <NotFoundPage />,
      },
    ],
  },
]
