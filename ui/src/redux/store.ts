import { configureStore } from '@reduxjs/toolkit'

import chatApi from './chat.api'
import userApi from './user.api'
import layoutReducer from './layout.slice'
import authReducer from './auth.slice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: import.meta.env.DEV }).concat([
      userApi.middleware,
      chatApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
