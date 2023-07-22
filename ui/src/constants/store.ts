import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '../slices/layout/layout.slice'
import userReducer from '../slices/currentUser/currentUser.slice'
import chatReducer from '../slices/chat/chat.slice'

const reducer = {
  layout: layoutReducer,
  user: userReducer,
  chat: chatReducer,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
