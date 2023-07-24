import type { ReducersMapObject } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import layoutReducer from '@slices/layout/layout.slice'
import { chatApi, userApi } from '@apis'

const reducer: ReducersMapObject = {
  layout: layoutReducer,
  [userApi.reducerPath]: userApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
}

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, chatApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
