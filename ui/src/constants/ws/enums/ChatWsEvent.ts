export enum ChatWsEvent {
  // Debug section
  ECHO = 'Debug/Echo',

  // Rooms section
  JOIN_ROOMS = 'Room/Join',

  // Messages section
  SEND_MESSAGE = 'Message/Send',
  RECEIVE_MESSAGE = 'Message/Receive',
  DELETE_MESSAGE = 'Message/Delete',
  DELETE_ALL_MESSAGES = 'Message/DeleteAll',
}
