import type { ReducersMapObject } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '@slices/layout/layout.slice'
import { currentUserApi } from '@slices/currentUser/currentUser.slice'
import chatReducer from '@slices/chat/chat.slice'
import usersReducer from '@slices/users/users.slice'

const reducer: ReducersMapObject = {
  layout: layoutReducer,
  chat: chatReducer,
  users: usersReducer,
  [currentUserApi.reducerPath]: currentUserApi.reducer,
}

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currentUserApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
