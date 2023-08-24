import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '@slices/layout/layout.slice'
import { chatApi, userApi } from '@apis'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, chatApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
