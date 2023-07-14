export enum UserWsEvent {
  // Debug section
  ECHO = 'Debug/Echo',

  // Online status section
  IS_ONLINE = 'User/Online',
  IS_OFFLINE = 'User/Offline',
  PING_ONLINE_STATUS = 'User/PingStatus'
}
