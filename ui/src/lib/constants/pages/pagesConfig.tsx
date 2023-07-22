import { Outlet, RouteObject } from 'react-router-dom'

import App from '../../../App'
import HomePage from '../../../pages/Home/HomePage'
import LoginPage from '../../../pages/Login/LoginPage'
import NotFoundPage from '../../../pages/NotFound/NotFoundPage'
import RegisterPage from '../../../pages/Register/RegisterPage'
import FriendRequestsPage from '../../../pages/Users/:username/FriendRequests/FriendRequestsPage'
import UserPage from '../../../pages/Users/:username/UserPage'
import { AuthPrivateRoute } from '../../../protected-routes'
import { AppRoute } from '../../enums/AppRoute'
import ChatPage from '../../../pages/Chat/ChatPage'
import GroupChatInfoPage from "../../../pages/Chat/:groupId/Info/GroupChatInfoPage.tsx";
import ChatMessageAreaEmpty from "../../../components/chat/ChatMessageAreaEmpty/ChatMessageAreaEmpty.tsx";
import ChatMessageArea from "../../../containers/ChatMessageAreaContainer/ChatMessageAreaContainer.tsx";

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
            Component: ChatMessageAreaEmpty,
          },
          {
            path: AppRoute.CHAT_GROUP,
            Component: ChatMessageArea,
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
