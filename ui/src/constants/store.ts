import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '@slices/layout/layout.slice'
import { chatApi, userApi } from '@apis'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
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
