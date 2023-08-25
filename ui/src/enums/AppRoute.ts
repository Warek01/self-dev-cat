export enum AppRoute {
  ROOT = '/',

  // User & profile
  USERS = '/users',
  USER = '/users/:username',
  USER_PROFILE = '/users/:username/profile',
  USER_BLOGS = '/users/:username/blogs',
  USER_RESOURCES = '/users/:username/useful-resources',
  USER_FRIENDS = '/users/:username/friends',
  USER_FRIEND_REQUESTS = '/users/:username/friend-requests',

  // Utility
  SETTINGS = '/settings',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTER = '/register',

  // Chat
  CHAT = '/chat',
  CHAT_GROUP = '/chat/:groupId',
  CHAT_GROUP_INFO = '/chat/:groupId/info',

  ATTACHMENT = '/attachment/get/:id',

  ANY = '*',
}
