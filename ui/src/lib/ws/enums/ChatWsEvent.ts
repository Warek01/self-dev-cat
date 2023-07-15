export enum ChatWsEvent {
  // Debug section
  ECHO = 'Debug/Echo',

  // Rooms section
  JOIN_ROOM = 'Room/Join',

  // Messages section
  SEND_MESSAGE = 'Message/Send',
  RECEIVE_MESSAGE = 'Message/Receive',
}
