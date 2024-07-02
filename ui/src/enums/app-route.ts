export enum AppRoute {
  ROOT = '/',

  // User & profile
  USERS = '/users',
  USER = '/users/:userId',
  USER_PROFILE = '/users/:userId/profile',
  USER_BLOGS = '/users/:userId/blogs',
  USER_RESOURCES = '/users/:userId/useful-resources',
  USER_FRIENDS = '/users/:userId/friends',
  USER_FRIEND_REQUESTS = '/users/:userId/friend-requests',

  // Utility
  SETTINGS = '/settings',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',

  // Chat
  CHAT = '/chat',
  CHAT_GROUP = '/chat/:groupId',
  CHAT_GROUP_INFO = '/chat/:groupId/info',

  ANY = '*',
}
